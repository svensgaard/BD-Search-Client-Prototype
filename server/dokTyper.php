<?php
header('Access-Control-Allow-Origin: *');

$docTypes = get_docTypes();

if(empty($docTypes))
{
	response(null);
}
else
{
	response($docTypes);
}
	

function response($data)
{	

	$json_response = json_encode($data);
	
	echo $json_response;
	
}

function get_docTypes()
{
	$docTypesToReturn = array();
	$headers = true;
	if (($handle = fopen("DokTyper.CSV", "r")) !== FALSE) {
		while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
			$num = count($data);	
			if(!$headers) {
				$d = utf8ize($data);
				$docTypesToReturn[] = new DocumentType($d[0]);
			} else {
				$headers = false;
			}


		}
		fclose($handle);
	}
	return $docTypesToReturn;	
}

function utf8ize($d) {
    if (is_array($d)) 
        foreach ($d as $k => $v) 
            $d[$k] = utf8ize($v);

     else if(is_object($d))
        foreach ($d as $k => $v) 
            $d->$k = utf8ize($v);

     else 
        return utf8_encode($d);

    return $d;
}

class DocumentType {
	var $dokType;

	public function __construct($dokType) {
		$this->dokType = $dokType;
    }
}

?>