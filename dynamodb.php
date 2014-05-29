<?php
require 'vendor/autoload.php';

use Aws\DynamoDb\DynamoDbClient;
use Aws\Common\Enum\Region;

$dynamoDb = DynamoDbClient::factory(array(
    'key' => 'foo',
    'secret' => 'bar',
    'profile' => 'default',
    'region' => Region::US_EAST_1, #replace with your desired region
    'base_url' => 'http://localhost:8001'
));

$sessionHandler = $dynamoDb->registerSessionHandler(array(
    'table_name' => 'sessions',
    'session_lifetime' => ini_get('session.gc_maxlifetime')
));

session_start();
