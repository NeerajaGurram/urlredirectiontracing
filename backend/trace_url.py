import requests
from bs4 import BeautifulSoup

def trace_url(input_url):
    """
    Function to trace a URL and fetch its final destination, HTML content, and additional metadata.

    Args:
    - input_url (str): The initial URL to trace.

    Returns:
    - dict: A dictionary containing the final URL, status code, and parsed content.
    """
    try:
        # Follow redirections and fetch the final URL
        response = requests.get(input_url, allow_redirects=True, timeout=10)
        final_url = response.url
        status_code = response.status_code

        # Parse the HTML content of the final URL
        soup = BeautifulSoup(response.text, 'html.parser')
        title = soup.title.string if soup.title else "No Title Found"
        meta_description = soup.find("meta", attrs={"name": "description"})
        description = meta_description["content"] if meta_description else "No Description Found"
        
        # Extract copyright information
        meta_copyright = soup.find("meta", attrs={"name": "copyright"})
        copyright_info = meta_copyright["content"] if meta_copyright else "No Copyright Found"

        # Extract all outbound links
        outbound_links = [a['href'] for a in soup.find_all('a', href=True) if a['href'].startswith('http')]

        return {
            "final_url": final_url,
            "status_code": status_code,
            "title": title,
            "description": description,
            "copyright_info": copyright_info,
            "outbound_links": outbound_links
        }
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
