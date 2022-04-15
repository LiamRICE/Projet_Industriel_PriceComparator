# Projet_Industriel_PriceComparator
## RICE Liam, LAMBERT Jordan

## **Running**
- npm run start : runs the service
- npm run test : runs all service tests
- npm run unit_test : runs all service unit tests
- npm run int_test : runs all service integration tests

## **Documentation**
## service/parser.js
### parse_newsletter(src, callback)
This function takes in a source file, reads it, and outputs the relevant images, links and the unsubscribe link.
#### input
- src : a link to a .txt file to read
- callback : callback function that returns with image_sources, link_tags, unsubscribe_tag
#### output (in callback)
- data : a data object containing
    - origin : a string that contains the name of the company that produced the newletter
    - images : an array of image objects, each containing
        - image : a string containing the image tag of that image found within the newsletter
        - source : a string containing the original link to the image
    - tags : an array of tag objects, each containing
        - name : the name found within the link as it would appear underlined on a web page, reprisented as a string (cannot be an empty string, which excludes images as links)
        - link : the link tag in it's entirety, including the subtags found between <a> and </a> reprisented as a string
    - unsubscription : a tag object reprisating the unsubscription link containing
        - name : the name found within the link as it would appear underlined on a web page, reprisented as a string (cannot be an empty string, which excludes images as links)
        - link : the link tag in it's entirety, including the subtags found between <a> and </a> reprisented as a string

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
    - image : the image tag in its entirety reprisented as a string
    - source : the source of the image (its "src" marker) reprisented by a string

### get_link_tags(data, callback)
This function reads a newsletter and returns an array of all of the link tags contained within.
#### input
- data : the entirety of a newsletter in html format reprisented as a string
- callback : a callback function that returns with an array of links
#### output
- links : an array of all the link tags (<a> tags) within the newsletter reprisented as strings

### get_link_details(links, callback)
This function reads an array of link tags and returns each link tag with its relevant source (marked href).
#### input
- links : an array of complete link tags reprisented as strings
- callback : callback function that returns with link_tags
#### output (in callback)
- link_tags : an array of link objects, each containing
    - link : the link source, or what is found in the "href" descriptor of the <a> tag reprisented as a string
    - tag : the link tag in it's entirety, including the subtags found between <a> and </a> reprisented as a string

### get_link_names(links, callback)
This function reads an array of link tags and returns only the link tags that have names (the underlined text on a web page).
#### input
- links
- callback : a callback function that returns with link_names
#### output (in callback)
- link_names : an array of link objects, each containing
    - name : the name found within the link as it would appear underlined on a web page, reprisented as a string (cannot be an empty string, which excludes images as links)
    - link : the link tag in it's entirety, including the subtags found between <a> and </a> reprisented as a string

### get_image(data)
This function reads a data object and uploads an image to the PriceComparator image server and returns the web address of that uploaded image.
#### input
- data : a data object containing
    - company_name : the name of the company who provided the original image
    - image_url : the link to the image on that company's site
#### output (promise)
- promise : a promise that returns
    - resolve : the promise resolves the newly created link to the uploaded image
    - reject : the promise rejects the error that caused the function to fail

### get_unique_ID()
This function returns a unique integer to use as an ID
#### output
- id : a unique integer, it corresponds to the number of images uploaded to the server

### to_data(data, callback)
#### input
- data : a data object (as the one returned by the parse_newsletter function) containing
    - origin : a string that contains the name of the company that produced the newletter
    - images : an array of image objects, each containing
        - image : a string containing the image tag of that image found within the newsletter
        - source : a string containing the original link to the image
    - tags : an array of tag objects, each containing
        - name : the name found within the link as it would appear underlined on a web page, reprisented as a string (cannot be an empty string, which excludes images as links)
        - link : the link tag in it's entirety, including the subtags found between <a> and </a> reprisented as a string
    - unsubscription : a tag object reprisating the unsubscription link containing
        - name : the name found within the link as it would appear underlined on a web page, reprisented as a string (cannot be an empty string, which excludes images as links)
        - link : the link tag in it's entirety, including the subtags found between <a> and </a> reprisented as a string
#### output (in callback)
- data : an array of objects formatted for the get_image function each containing
    - company_name : the name of the company who provided the original image
    - image_url : the link to the image on that company's site
