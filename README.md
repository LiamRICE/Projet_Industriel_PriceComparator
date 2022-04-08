# Projet_Industriel_PriceComparator
## RICE Liam, LAMBERT Jordan

## service/parser.js
### parse_newsletter(src, callback)
This function takes in a source file, reads it, and outputs the relevant images, links and the unsubscribe link.
#### input
- src : a link to a .txt file to read
- callback : callback function that returns with image_sources, link_tags, unsubscribe_tag
#### output (in callback)
- image_sources : an array of image objects, each containing
- - image : the image tag in its entirety reprisented as a string
- - source : the source of the image (its "src" marker) reprisented by a string
- link_tags : an array of link objects, each containing
- - link : the link source, or what is found in the "href" descriptor of the <a> tag reprisented as a string
- - tag : the link tag in it's entirety, including the subtags found between <a> and </a> reprisented as a string
- unsubscribe_tag : the link tag that allows a user to unsubscribe from the newsletters, as an object containing
- - name : the name of the tag, what is found between the <a> tags and subtags reprisented as a string
- - link : the full link tag, including the subtags found between <a> and </a> reprisented as a string

### find_images(data, callback)
This function reads a newsletter and isolates all of the image tags contained within.
#### input
- data : the entirety of a newsletter in html format reprisented as a string
- callback : a callback function that returns with an array of images
#### output (in callback)
- images : an array of all of the image tags within the newsletter reprisented as strings

### get_image_list_souces(images, callback)
This function reads an array of image tags and returns each image tag with its relevant source (marked src).
#### input
- images : an array of complete image tags reprisented as strings
- callback : a callback function that returns with image_sources
#### output (in callback)
- image_sources : an array of image objects, each containing
- - image : the image tag in its entirety reprisented as a string
- - source : the source of the image (its "src" marker) reprisented by a string

### get_link_tags(data, callback)
This function reads a newsletter and returns an array of all of the link tags contained within.
#### input
- data : the entirety of a newsletter in html format reprisented as a string
- callback : a callback function that returns with an array of links
#### output
- links : an array of all the link tags (<a> tags) within the newsletter reprisented as strings

### get_link_details(links, callback)
This function reads an array of link tags and returns each link tag with its relevant source (marked href)
#### input
- links : an array of complete link tags reprisented as strings
- callback : callback function that returns with link_tags
#### output (in callback)
- link_tags : an array of link objects, each containing
- - link : the link source, or what is found in the "href" descriptor of the <a> tag reprisented as a string
- - tag : the link tag in it's entirety, including the subtags found between <a> and </a> reprisented as a string

### get_link_names(links, callback)
This function reads an array of link tags and returns only the link tags that have names (the underlined text on a web page)
#### input
- links
- callback : a callback function that returns with link_names
#### output (in callback)
- link_names : an array of link objects, each containing
- - name : the name found within the link as it would appear underlined on a web page, reprisented as a string (cannot be an empty string, which excludes images as links)
- - link : the link tag in it's entirety, including the subtags found between <a> and </a> reprisented as a string