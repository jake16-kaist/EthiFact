import requests

def fetch_paper_metadata(doi):
    url = f"https://api.crossref.org/works/{doi}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def extract_dois_from_metadata(metadata):
    dois = []
    if metadata and 'message' in metadata and 'reference' in metadata['message']:
        for ref in metadata['message']['reference']:
            print(ref)
            if 'DOI' in ref:
                dois.append(ref['DOI'])
            else:
                dois.append("nodoi")
    return dois

# Example usage
doi = "10.1145/2840723"  # Replace with the actual DOI
metadata = fetch_paper_metadata(doi)
other_dois = extract_dois_from_metadata(metadata)

print("Extracted DOIs:", other_dois)
 