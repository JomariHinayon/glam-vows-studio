from rest_framework import serializers

from .models import (
    Chapter,
    CollectionItem,
    CustomizeItem,
    FooterLink,
    HomePage,
    NavLink,
    SocialLink,
)


class NavLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavLink
        fields = ["label", "url", "has_dropdown"]


class CollectionItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = CollectionItem
        fields = ["title", "image"]


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ["numeral", "title", "description"]


class CustomizeItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomizeItem
        fields = ["label"]


class FooterLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterLink
        fields = ["label", "url"]


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ["icon", "url"]


class HomePageSerializer(serializers.ModelSerializer):
    nav_links = NavLinkSerializer(many=True, read_only=True)
    collection_items = CollectionItemSerializer(many=True, read_only=True)
    chapters = ChapterSerializer(many=True, read_only=True)
    customize_items = CustomizeItemSerializer(many=True, read_only=True)
    footer_links = FooterLinkSerializer(many=True, read_only=True)
    social_links = SocialLinkSerializer(many=True, read_only=True)
    hero_image = serializers.ImageField(use_url=True)
    showcase_image = serializers.ImageField(use_url=True)
    final_bg_image = serializers.ImageField(use_url=True)

    # Split blank-line-separated blocks into a list of paragraphs
    why_paragraphs = serializers.SerializerMethodField()

    class Meta:
        model = HomePage
        fields = [
            "logo_text",
            "logo_accent",
            "nav_links",
            "hero_eyebrow",
            "hero_heading",
            "hero_subtitle",
            "hero_cta_label",
            "hero_image",
            "why_eyebrow",
            "why_paragraphs",
            "collections_eyebrow",
            "collections_heading",
            "collections_subtitle",
            "collections_cta_label",
            "collection_items",
            "chapters_eyebrow",
            "chapters_heading",
            "chapters",
            "showcase_image",
            "customize_eyebrow",
            "customize_heading",
            "customize_body",
            "customize_list_title",
            "customize_cta_label",
            "customize_items",
            "final_eyebrow",
            "final_heading",
            "final_subtitle",
            "final_primary_cta",
            "final_secondary_cta",
            "final_bg_image",
            "footer_copyright",
            "footer_tagline",
            "footer_links",
            "social_links",
        ]

    def get_why_paragraphs(self, obj):
        blocks = [b.strip() for b in obj.why_body.split("\n\n")]
        return [b for b in blocks if b]
