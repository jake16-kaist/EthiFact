from anytree import Node, RenderTree
from anytree.exporter import DotExporter
#from doitodoi import doitodoi  

def build_reference_tree():
    home = Node(".",)
    init_ref_list = ["doi1","doi2"]
    for i in init_ref_list:
      t = Node(i, parent=home)
    
