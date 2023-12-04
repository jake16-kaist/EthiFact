import csv

file = open('data/sci_doi_combined.csv') 

csvreader = csv.reader(file)

header = [] 
header = next(csvreader) 

sci_doi = [] 
for row in csvreader: 
    sci_doi.append(row[1])

print(sci_doi)

def isSCI(doi):
    if doi in sci_doi:
        return True
    else: 
        return False