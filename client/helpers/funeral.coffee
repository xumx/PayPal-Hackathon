# Template.funeral.helpers
#   exampleMapOptions: ->
#     if GoogleMaps.loaded()
#       options = 
#         center: new google.maps.LatLng(-37.8136, 144.9631),
#         zoom: 8

#       return options

# Template.funeral.onCreated = ->
#   if GoogleMaps.loaded()
#     GoogleMaps.ready('exampleMap', (map) ->
#       marker = new google.maps.Marker({
#         position: map.options.center,
#         map: map.instance
#       })
#     )
#         