from crossref.restful import Works
import requests

def get_paper_stats(doi):
    works = Works()
    paper = works.doi(doi)
    
    if not paper:
        print("No data found for DOI:", doi)
        return

    references = paper.get('reference', [])
    print(f"Found {len(references)} references for DOI: {doi}")

    stats = {
        'citation_counts': {},
        'publishers': {},
        'source_types': {}
    }

    for ref in references:
        ref_doi = ref.get('DOI')
        if ref_doi:
            try:
                ref_data = works.doi(ref_doi)
                # Citation
                citation_count = ref_data.get('is-referenced-by-count', 0)
                stats['citation_counts'][ref_doi] = citation_count

                # Publisher
                publisher = ref_data.get('publisher', 'Unknown')
                stats['publishers'][publisher] = stats['publishers'].get(publisher, 0) + 1

                # Source type
                source_type = ref_data.get('type', 'Unknown')
                stats['source_types'][source_type] = stats['source_types'].get(source_type, 0) + 1
            except requests.exceptions.RequestException as e:
                print(f"Error fetching data for DOI {ref_doi}: {e}")

    return stats

if __name__ == "__main__":
    # Example usage
    doi = "10.1145/356901.356903"
    stats = get_paper_stats(doi)
    print(stats)
