# Projet_Industriel_PriceComparator
## RICE Liam, LAMBERT Jordan

## service/parser.js
### parse_newsletter(src, callback)
#### input
- src : a link to a .txt file to read
- callback : callback function that returns with image_sources, link_tags, unsubscribe_tag
#### output
- image_sources : a list of image objects containing
- - image: the image tag in its entirety reprisented as a string
- - source: the source of the image (its "src" marker) reprisented by a string
