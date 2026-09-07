"""Content models for the GlamVowsStudio homepage.

The homepage is a single, structured page. Scalar (one-off) copy lives on the
`HomePage` singleton; repeatable rows (nav links, collection cards, chapters,
customization items, footer links, socials) live in related models.

Text that contains *italic* emphasis is stored with asterisk markers, e.g.
"Every love story deserves a beautiful *prologue.*". The frontend converts the
marked spans into <em> elements, which is how the display serif shows italics.
"""

from django.db import models


class Singleton(models.Model):
    """Base for models that should only ever have one row (pk=1)."""

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class HomePage(Singleton):
    # --- Brand / navbar ---
    logo_text = models.CharField(max_length=100, default="GLAM VOWS")
    logo_accent = models.CharField(
        max_length=100, default="STUDIO", help_text="Italic part of the wordmark"
    )

    # --- Hero ---
    hero_eyebrow = models.CharField(max_length=200, default="")
    hero_heading = models.CharField(max_length=300, default="")
    hero_subtitle = models.TextField(default="")
    hero_cta_label = models.CharField(max_length=80, default="")
    hero_image = models.ImageField(upload_to="figma/", blank=True)

    # --- Our Why ---
    why_eyebrow = models.CharField(max_length=200, default="")
    why_body = models.TextField(
        default="", help_text="One paragraph per blank-line-separated block"
    )

    # --- Our Collections ---
    collections_eyebrow = models.CharField(max_length=200, default="")
    collections_heading = models.CharField(max_length=200, default="")
    collections_subtitle = models.TextField(default="")
    collections_cta_label = models.CharField(max_length=80, default="")

    # --- Five Chapters ---
    chapters_eyebrow = models.CharField(max_length=200, default="")
    chapters_heading = models.CharField(max_length=300, default="")

    # --- Showcase (large mockup) ---
    showcase_image = models.ImageField(upload_to="figma/", blank=True)

    # --- Done For You ---
    customize_eyebrow = models.CharField(max_length=200, default="")
    customize_heading = models.CharField(max_length=300, default="")
    customize_body = models.TextField(default="")
    customize_list_title = models.CharField(max_length=200, default="")
    customize_cta_label = models.CharField(max_length=80, default="")

    # --- Final CTA ---
    final_eyebrow = models.CharField(max_length=200, default="")
    final_heading = models.CharField(max_length=300, default="")
    final_subtitle = models.TextField(default="")
    final_primary_cta = models.CharField(max_length=80, default="")
    final_secondary_cta = models.CharField(max_length=80, default="")
    final_bg_image = models.ImageField(upload_to="figma/", blank=True)

    # --- Footer ---
    footer_copyright = models.CharField(max_length=200, default="")
    footer_tagline = models.CharField(max_length=200, default="")

    class Meta:
        verbose_name = "Home page"

    def __str__(self):
        return "GlamVowsStudio Homepage"


class NavLink(models.Model):
    home = models.ForeignKey(HomePage, related_name="nav_links", on_delete=models.CASCADE)
    label = models.CharField(max_length=60)
    url = models.CharField(max_length=200, default="#")
    has_dropdown = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.label


class CollectionItem(models.Model):
    home = models.ForeignKey(
        HomePage, related_name="collection_items", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=120)
    image = models.ImageField(upload_to="figma/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class Chapter(models.Model):
    home = models.ForeignKey(HomePage, related_name="chapters", on_delete=models.CASCADE)
    numeral = models.CharField(max_length=10)
    title = models.CharField(max_length=120)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.numeral}. {self.title}"


class CustomizeItem(models.Model):
    home = models.ForeignKey(
        HomePage, related_name="customize_items", on_delete=models.CASCADE
    )
    label = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.label


class FooterLink(models.Model):
    home = models.ForeignKey(
        HomePage, related_name="footer_links", on_delete=models.CASCADE
    )
    label = models.CharField(max_length=60)
    url = models.CharField(max_length=200, default="#")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.label


class SocialLink(models.Model):
    home = models.ForeignKey(
        HomePage, related_name="social_links", on_delete=models.CASCADE
    )
    # icon is a known key the frontend maps to an inline SVG
    icon = models.CharField(
        max_length=30,
        choices=[
            ("facebook", "Facebook"),
            ("instagram", "Instagram"),
            ("linkedin", "LinkedIn"),
            ("youtube", "YouTube"),
        ],
    )
    url = models.CharField(max_length=200, default="#")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.icon
