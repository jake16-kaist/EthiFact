import pandas as pd
import os
import urllib.request, json

data_sci = pd.read_csv(os.path.join(os.path.dirname(__file__), "scie_list_raw.CSV"), encoding="euc-kr")
print(data_sci.head())

# save json file (one-time execution is enough)
# with urllib.request.urlopen("http://doi.crossref.org/getPrefixPublisher/?prefix=all") as url:
#     data_doi = json.load(url)

# with open("doi_list_raw.json", "w") as json_file:
#     json.dump(data_doi, json_file)

