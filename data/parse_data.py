import pandas as pd
import os
import urllib.request, json

data_sci = pd.read_csv(os.path.join(os.path.dirname(__file__), "scie_list_raw.CSV"), encoding="euc-kr")

# save json file (one-time execution is enough)
# with urllib.request.urlopen("http://doi.crossref.org/getPrefixPublisher/?prefix=all") as url:
#     data_doi = json.load(url)

# with open("doi_list_raw.json", "w") as json_file:
#     json.dump(data_doi, json_file)

with open(os.path.join(os.path.dirname(__file__), "doi_list_raw.json"), "r") as json_file:
    data_doi = json.load(json_file)

pub_unique = data_sci["Publisher"].unique()
pub_unique_mod = []
for pub in pub_unique:
    pub_new = " " + pub.lower() + " "
    pub_new = pub_new.replace(" univ ", " university ").replace(" assoc ", "association ").replace(" soc ", " society ")
    pub_unique_mod.append(pub_new.strip())

doi_dict = {}
for d in data_doi:
    d_lower = d['name'].lower()
    doi_dict[d_lower] = {"doi": d['prefixes'], "proper name": d['name']}

ret_df = pd.DataFrame(columns=["DOI", "Publisher"])
p_added = set()
for p1 in pub_unique_mod:
    for p2 in doi_dict.keys():
        if (p1 in p2) or (p2 in p1):
            proper_name = doi_dict[p2]["proper name"]
            if proper_name not in p_added:
                for doi in doi_dict[p2]["doi"]:
                    new_row = {"DOI": doi, "Publisher": proper_name}
                    ret_df.loc[len(ret_df)] = new_row
                p_added.add(proper_name)
                break

print(ret_df.head())
ret_df.to_csv("sci_doi_combined.csv")