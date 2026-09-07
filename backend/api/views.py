from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import HomePage
from .serializers import HomePageSerializer


@api_view(["GET"])
def homepage(request):
    """Return the full structured content for the GlamVowsStudio homepage."""
    home = HomePage.load()
    serializer = HomePageSerializer(home, context={"request": request})
    return Response(serializer.data)
