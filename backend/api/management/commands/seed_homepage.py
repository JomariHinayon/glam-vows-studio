"""Seed the SQLite database with the GlamVowsStudio homepage content.

Run:  python manage.py seed_homepage
Idempotent — clears and repopulates the homepage rows each run.
Image files are attached from backend/media/figma if present (see
`generate_assets.py`), but content seeds fine without them.
"""

from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand

from api.models import (
    Chapter,
    CollectionItem,
    CustomizeItem,
    FooterLink,
    HomePage,
    NavLink,
    NavSubLink,
    SocialLink,
)

FIGMA_DIR = Path(settings.MEDIA_ROOT) / "figma"


class Command(BaseCommand):
    help = "Populate the database with the GlamVowsStudio homepage content."

    def handle(self, *args, **options):
        home = HomePage.load()

        # --- Brand ---
        home.logo_text = "GLAM VOWS"
        home.logo_accent = "STUDIO"

        # --- Hero ---
        home.hero_eyebrow = "WEDDING WEBSITES & DIGITAL INVITATIONS"
        home.hero_heading = "Every love story deserves\na beautiful *prologue.*"
        home.hero_subtitle = (
            "Glam Vows Studio designs the first chapter of your wedding journey, "
            "a website as personal, elegant, and timeless as the day it's leading to."
        )
        home.hero_cta_label = "Begin Your Story"

        # --- Our Why ---
        home.why_eyebrow = "OUR WHY"
        home.why_body = (
            "Glam Vows Studio was created to make the beginning of a couple's wedding "
            "journey feel just as beautiful as the celebration itself.\n\n"
            "We create thoughtfully designed wedding websites and digital invitations "
            "that allow couples to share their love story, wedding details, and special "
            "moments in one beautiful digital experience.\n\n"
            "Every design is made to feel personal, elegant, modern, and timeless — "
            "because your wedding should feel uniquely yours."
        )

        # --- Our Collections ---
        home.collections_eyebrow = "SAMPLE WORKS"
        home.collections_heading = "Our Collections"
        home.collections_subtitle = (
            "Discover our collections and find the one that fits your story."
        )
        home.collections_cta_label = "View the full collection"

        # --- Five Chapters ---
        home.chapters_eyebrow = "YOUR WEBSITE, IN FIVE CHAPTERS"
        home.chapters_heading = "Told the way a *love story* should be."

        # --- Done For You ---
        home.customize_eyebrow = "DONE FOR YOU, NOT DIY"
        home.customize_heading = "We build it with you, *not you alone.*"
        home.customize_body = (
            "Right now, every Glam Vows Studio site is set up by our team, not a "
            "self-editing tool. You won't touch a website builder, just tell us what "
            "you'd like changed, and we take care of it."
        )
        home.customize_list_title = "TELL US WHAT TO CUSTOMIZE"
        home.customize_cta_label = "Get my wedding site"

        # --- Final CTA ---
        home.final_eyebrow = "YOUR FIRST CHAPTER STARTS HERE"
        home.final_heading = 'Say *"I do"* to a website that feels like you.'
        home.final_subtitle = (
            "From first message to live site, our team handles every detail, so the "
            "only thing you have to plan is the wedding."
        )
        home.final_primary_cta = "Begin your story"
        home.final_secondary_cta = "Explore chapters"

        # --- Footer ---
        home.footer_copyright = "© 2026 GLAM VOWS STUDIO"
        home.footer_tagline = "WEDDING WEBSITES & DIGITAL INVITATIONS"

        self._attach(home, "hero_image", "hero.jpg")
        self._attach(home, "showcase_image", "showcase.jpg")
        self._attach(home, "final_bg_image", "cta-texture.jpg")
        home.save()

        # --- Navbar (links jump to sections of the homepage) ---
        home.nav_links.all().delete()
        nav = [
            ("HOME", "#top", False),
            ("SHOP", "#collections", True),
            ("CART", "#cart", False),
            ("ABOUT", "#about", False),
            ("CONTACT", "#contact", False),
        ]
        for i, (label, url, dd) in enumerate(nav):
            NavLink.objects.create(
                home=home, label=label, url=url, has_dropdown=dd, order=i
            )

        # SHOP dropdown (items as in the Figma menu)
        shop = home.nav_links.get(label="SHOP")
        shop_menu = [
            "All Templates",
            "Wedding Websites",
            "Save the Date",
            "Invitation Suites",
            "Signage and Stationery",
            "Bundles",
        ]
        for i, label in enumerate(shop_menu):
            NavSubLink.objects.create(parent=shop, label=label, url="#collections", order=i)

        # --- Collections ---
        home.collection_items.all().delete()
        collections = [
            ("Wedding Websites", "collection-1.jpg"),
            ("Invitation Suites", "collection-2.jpg"),
            ("Signage & Stationery", "collection-3.jpg"),
        ]
        for i, (title, img) in enumerate(collections):
            item = CollectionItem(home=home, title=title, order=i)
            self._attach(item, "image", img)
            item.save()

        # --- Chapters (numerals as shown in the Figma design) ---
        home.chapters.all().delete()
        chapters = [
            ("I", "Our Story", "How you met, the proposal, and the moments that led here."),
            ("II", "The Details", "Date, venue, timeline, and everything guests need to know."),
            ("III", "RSVP", "A reply as effortless as a nod across the room."),
            ("VI", "Registry", "Gifts and gestures, gathered in one considered place."),
            ("V", "Gallery", "The photos before, during, and long after the vows."),
        ]
        for i, (num, title, desc) in enumerate(chapters):
            Chapter.objects.create(
                home=home, numeral=num, title=title, description=desc, order=i
            )

        # --- Customize checklist ---
        home.customize_items.all().delete()
        customize = [
            "Wording (text)",
            "Font style",
            "Font color",
            "Text placement",
            "Background color",
            "Your own photos, uploaded for you",
            "Countdown, music playlist, maps, prenup video & more",
            "Page order — add, duplicate, hide, or remove",
        ]
        for i, label in enumerate(customize):
            CustomizeItem.objects.create(home=home, label=label, order=i)

        # --- Footer links ---
        home.footer_links.all().delete()
        footer = [
            ("The Site", "#top"),
            ("Shop", "#collections"),
            ("About", "#about"),
            ("Contact", "#contact"),
            ("Account", "#top"),
        ]
        for i, (label, url) in enumerate(footer):
            FooterLink.objects.create(home=home, label=label, url=url, order=i)

        # --- Social links ---
        home.social_links.all().delete()
        for i, icon in enumerate(["facebook", "instagram", "linkedin", "youtube"]):
            SocialLink.objects.create(home=home, icon=icon, url="#", order=i)

        self.stdout.write(self.style.SUCCESS("Seeded GlamVowsStudio homepage content."))

    def _attach(self, obj, field, filename):
        """Attach an image file from media/figma if it exists."""
        path = FIGMA_DIR / filename
        if path.exists():
            # Store the relative path directly (file already lives in MEDIA_ROOT)
            setattr(obj, field, f"figma/{filename}")
        else:
            self.stdout.write(
                self.style.WARNING(f"  (image not found, skipping: {filename})")
            )
