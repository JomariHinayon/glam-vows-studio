from django.contrib import admin

from .models import (
    Chapter,
    CollectionItem,
    CustomizeItem,
    FooterLink,
    HomePage,
    NavLink,
    SocialLink,
)


class NavLinkInline(admin.TabularInline):
    model = NavLink
    extra = 0


class CollectionItemInline(admin.TabularInline):
    model = CollectionItem
    extra = 0


class ChapterInline(admin.TabularInline):
    model = Chapter
    extra = 0


class CustomizeItemInline(admin.TabularInline):
    model = CustomizeItem
    extra = 0


class FooterLinkInline(admin.TabularInline):
    model = FooterLink
    extra = 0


class SocialLinkInline(admin.TabularInline):
    model = SocialLink
    extra = 0


@admin.register(HomePage)
class HomePageAdmin(admin.ModelAdmin):
    inlines = [
        NavLinkInline,
        CollectionItemInline,
        ChapterInline,
        CustomizeItemInline,
        FooterLinkInline,
        SocialLinkInline,
    ]

    def has_add_permission(self, request):
        # Singleton — only one homepage
        return not HomePage.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
