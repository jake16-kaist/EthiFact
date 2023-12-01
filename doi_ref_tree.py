from anytree import Node, RenderTree
from anytree.exporter import DotExporter
from get_doi import get_doi 
from isSCI import isSCI

home = Node(".", score = -1)

def get_prefix(doi):
    return doi.split("/")[0]

def build_reference_tree(root,doi,depth):
    if depth == 3:
        return root
    doi_list = get_doi(doi)
    for i in doi_list:
      if i == "nodoi":
        t = Node(i, parent=root, score = 0)
        return t
      elif isSCI(get_prefix(i)) == True:
        t = Node(i, parent=root, score = 100)
        return t
      else: 
        t = Node(i, parent=root, score = -1)
        build_reference_tree(t,i,depth+1)

def visualize_tree_png(root):
    DotExporter(root).to_picture("tree.png")

def visualize_tree_txt(root):
    for pre, fill, node in RenderTree(root):
        print("%s%s" % (pre, node.name))

def get_score(root):
    score = 0
    for i in root.descendants:
      if i.score == -1:
        if i.depth == 3:
          i.score = 50
        i.score = get_score(i)
      else: 
        score += i.score
        score = score / len(root.descendants)
    root.score = score

    
init_ref_list=[]
for i in init_ref_list:
  if i == "nodoi":
    t = Node(i, parent=home, score = 0)
  elif isSCI(get_prefix(i)) == True:
    t= Node(i, parent=home, score = 100)
  else:
    t = Node(i, parent=home, score = -1)
    build_reference_tree(t,i,1)
get_score(home)