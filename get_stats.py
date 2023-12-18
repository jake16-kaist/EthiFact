from crossref.restful import Works
import requests
import json
import sys

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
        'source_types': {},
        'etc': []
    }


    for ref in references:
        ref_doi = ref.get('DOI')
        if ref_doi:
            try:
                ref_data = works.doi(ref_doi)
                if ref_data:
                    # Citation
                    citation_count = ref_data.get('is-referenced-by-count', 0)
                    stats['citation_counts'][ref_doi] = citation_count

                    # Publisher
                    publisher = ref_data.get('publisher', 'Unknown')
                    stats['publishers'][publisher] = stats['publishers'].get(publisher, 0) + 1

                    # Source type
                    source_type = ref_data.get('type', 'Unknown')
                    stats['source_types'][source_type] = stats['source_types'].get(source_type, 0) + 1
                
                else:
                    stats['etc'].append(ref_doi)
            except requests.exceptions.RequestException as e:
                print(f"Error fetching data for DOI {ref_doi}: {e}")

    return stats

if __name__ == "__main__":
    # Example
    doi = "10.1145/2840723"

    # For user input on command line (local support only)
    # doi = sys.argv[1]
    
    stats = get_paper_stats(doi)
    print(stats['citation_counts'])
    print(stats['publishers'])
    print(stats['source_types'])
    # etc : cannot find paper info
    print(stats['etc'])

    citation_counts_json = {"lables": ["≥500", "≥100", "≥50", "≥10", "less than 10"], "data": [0, 0, 0, 0, 0]}
    for k, v in stats['citation_counts'].items():
        if v >= 500:
            citation_counts_json["data"][0] += 1
        elif v >= 100:
            citation_counts_json["data"][1] += 1
        elif v >= 50:
            citation_counts_json["data"][2] += 1
        elif v >= 10:
            citation_counts_json["data"][3] += 1
        else:
            citation_counts_json["data"][4] += 1
    
    publishers_json = {"lables": [], "data": []}
    for k, v in stats['publishers'].items():
        publishers_json["lables"].append(k)
        publishers_json["data"].append(v)
    
    source_types_json = {"lables": [], "data": []}
    for k, v in stats['source_types'].items():
        source_types_json["lables"].append(k)
        source_types_json["data"].append(v)

    etc_json = {"doi": stats["etc"]}
    

    with open("data/citation_counts.json", "w") as f:
        json.dump(citation_counts_json, f)
    
    with open("data/publishers.json", "w") as f:
        json.dump(publishers_json, f)
    
    with open("data/source_types.json", "w") as f:
        json.dump(source_types_json, f)

    with open("data/etc.json", "w") as f:
        json.dump(etc_json, f)

    