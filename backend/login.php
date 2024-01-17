<?php
   include_once("db.php");
   $data = JSON_decode(file_get_contents("php://input"));
   $username = $data->username;
   $password = $data->password;
   if($username === 'username' && $password === 'password'){
    echo json_encode(['success'=>true,'message'=>'Successful'])
   }
   else{
    echo json_encode(['success'=>false,'message'=>'Incorrect'])
   }

?>