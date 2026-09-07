"""Generate palette-matched placeholder imagery for the homepage.

Run:  python manage.py generate_assets

These are elegant, editorial stand-ins that match the GlamVowsStudio palette so
the site renders complete. To use the *real* Figma photos instead, export each
image from Figma (or via the Figma API) and drop it into backend/media/figma/
with the SAME filename, then re-run `python manage.py seed_homepage`:

    hero.jpg           hero background (warm laptop-on-table scene)
    collection-1.jpg   "Wedding Websites" card (laptop mockup)
    collection-2.jpg   "Invitation Suites" card (tablet mockup)
    collection-3.jpg   "Signage & Stationery" card (card on stone)
    showcase.jpg       large laptop mockup
    cta-texture.jpg    final CTA band paper texture
"""

import math
import random

from django.conf import settings
from django.core.management.base import BaseCommand
from PIL import Image, ImageDraw, ImageFilter

OUT = settings.MEDIA_ROOT / "figma"


def _grain(img, amount=6):
    """Add subtle film grain for an editorial, non-flat look."""
    px = img.load()
    w, h = img.size
    rnd = random.Random(7)
    for y in range(h):
        for x in range(w):
            n = rnd.randint(-amount, amount)
            r, g, b = px[x, y][:3]
            px[x, y] = (
                max(0, min(255, r + n)),
                max(0, min(255, g + n)),
                max(0, min(255, b + n)),
            )
    return img


def _vgradient(size, top, bottom):
    w, h = size
    base = Image.new("RGB", (1, h))
    for y in range(h):
        t = y / max(1, h - 1)
        base.putpixel(
            (0, y),
            tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)),
        )
    return base.resize(size)


def _radial_light(img, center, radius, color, strength=0.55):
    """Blend a soft light spot into img."""
    w, h = img.size
    light = Image.new("RGB", (w, h), color)
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    cx, cy = center
    md.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=int(255 * strength))
    mask = mask.filter(ImageFilter.GaussianBlur(radius * 0.6))
    return Image.composite(light, img, mask)


def _soft_shadow(img, box, blur=40, opacity=60):
    """Composite a soft blurred drop shadow beneath a box region."""
    w, h = img.size
    sh = Image.new("L", (w, h), 0)
    sd = ImageDraw.Draw(sh)
    x0, y0, x1, y1 = box
    sd.rounded_rectangle([x0, y1 - 30, x1, y1 + 40], radius=30, fill=opacity)
    sh = sh.filter(ImageFilter.GaussianBlur(blur))
    dark = Image.new("RGB", (w, h), (20, 16, 12))
    return Image.composite(dark, img, sh)


def _panel(img, box, tone, radius=16, shadow=True):
    """Draw a soft low-contrast panel (a mockup 'screen') that blends with the
    surface instead of reading as a hard white box."""
    if shadow:
        img = _soft_shadow(img, box, blur=50, opacity=70)
    x0, y0, x1, y1 = box
    panel = Image.new("RGB", img.size, tone)
    mask = Image.new("L", img.size, 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle(box, radius=radius, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(1.2))
    img = Image.composite(panel, img, mask)
    # very soft top-down sheen inside the panel
    sheen = _vgradient((int(x1 - x0), int(y1 - y0)),
                       tuple(min(255, c + 8) for c in tone),
                       tuple(max(0, c - 6) for c in tone))
    img.paste(sheen, (int(x0), int(y0)))
    return img


def hero():
    w, h = 2000, 1150
    img = _vgradient((w, h), (78, 67, 57), (32, 26, 21)).convert("RGB")
    img = _radial_light(img, (w * 0.5, h * 0.30), 720, (196, 176, 150), 0.4)
    # soft diagonal shadow bands, like light through a window
    band = Image.new("RGB", (w, h), (0, 0, 0))
    bmask = Image.new("L", (w, h), 0)
    bd = ImageDraw.Draw(bmask)
    for i in range(-2, 8):
        x = i * 340
        bd.polygon([(x, 0), (x + 150, 0), (x + 150 - 420, h), (x - 420, h)], fill=22)
    bmask = bmask.filter(ImageFilter.GaussianBlur(55))
    img = Image.composite(band, img, bmask)
    img = _grain(img, 5)
    img.filter(ImageFilter.GaussianBlur(0.5)).save(OUT / "hero.jpg", quality=88)


def _mockup_card(name, surface_top, surface_bottom, device="laptop"):
    w, h = 1200, 1040
    img = _vgradient((w, h), surface_top, surface_bottom).convert("RGB")
    img = _radial_light(img, (w * 0.5, h * 0.34), 500, (250, 246, 238), 0.28)
    cx, cy = w * 0.5, h * 0.48
    # panel tone: just a touch lighter than the surface (low contrast, elegant)
    tone = tuple(min(255, c + 22) for c in surface_top)
    if device == "laptop":
        bw, bh = w * 0.60, h * 0.42
        box = [cx - bw / 2, cy - bh / 2, cx + bw / 2, cy + bh / 2]
        img = _panel(img, box, tone, radius=10)
    elif device == "tablet":
        bw, bh = w * 0.40, h * 0.50
        box = [cx - bw / 2, cy - bh / 2, cx + bw / 2, cy + bh / 2]
        img = _panel(img, box, tone, radius=28)
    else:  # card on stone
        bw, bh = w * 0.38, h * 0.44
        box = [cx - bw / 2, cy - bh / 2, cx + bw / 2, cy + bh / 2]
        img = _panel(img, box, tuple(min(255, c + 16) for c in surface_top), radius=6)
    img = _grain(img, 5)
    img.save(OUT / name, quality=88)


def showcase():
    w, h = 2400, 1200
    img = _vgradient((w, h), (72, 62, 53), (38, 31, 26)).convert("RGB")
    img = _radial_light(img, (w * 0.5, h * 0.36), 780, (206, 188, 162), 0.4)
    bw, bh = w * 0.38, h * 0.56
    box = [w * 0.5 - bw / 2, h * 0.30, w * 0.5 + bw / 2, h * 0.30 + bh]
    img = _panel(img, box, (226, 219, 208), radius=12)
    img = _grain(img, 5)
    img.save(OUT / "showcase.jpg", quality=88)


def cta_texture():
    w, h = 2000, 760
    img = _vgradient((w, h), (233, 227, 216), (223, 216, 203)).convert("RGB")
    img = _grain(img, 4)
    img.save(OUT / "cta-texture.jpg", quality=90)


class Command(BaseCommand):
    help = "Generate palette-matched placeholder imagery into media/figma."

    def handle(self, *args, **options):
        OUT.mkdir(parents=True, exist_ok=True)
        hero()
        _mockup_card("collection-1.jpg", (226, 219, 206), (206, 197, 181), "laptop")
        _mockup_card("collection-2.jpg", (222, 214, 201), (200, 190, 175), "tablet")
        _mockup_card("collection-3.jpg", (232, 228, 220), (214, 208, 197), "card")
        showcase()
        cta_texture()
        self.stdout.write(self.style.SUCCESS(f"Generated placeholder assets in {OUT}"))
