# Use the official Apache image as the base image
FROM httpd:2.4

# Copy the contents of your web directory to the container's web root
COPY ./public-html/ /usr/local/apache2/htdocs/

# Optionally, you can copy a script file to the container
#COPY script.sh /usr/local/apache2/htdocs

# You can include a custom Apache configuration if needed
# COPY custom-httpd.conf /usr/local/apache2/conf/httpd.conf

