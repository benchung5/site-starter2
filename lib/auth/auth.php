<?php
namespace Lib\Auth;
use Config\Constants;
use Lib\Auth\JWT;
use Lib\Utils;

class Auth
{
	public static function generateToken($user_id) 
	{
		$paylod = [
			'iat' => time(),
			'iss' => 'localhost',
			'exp' => time() + (15*60),
			'userId' => $user_id
		];

		$token = JWT::encode($paylod, SECRETE_KEY);
		
		return ['token' => $token];
	}

	public static function validateToken() 
	{
		$token = self::getBearerToken();
		$payload = JWT::decode($token, SECRETE_KEY, ['HS256']);
		return $payload;
	}
    
    // get access token from header/
    protected function getBearerToken() 
    {
        $headers = self::getAuthorizationHeader();
        // HEADER: Get the access token from the header
        if (! empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        Utils::json_respond_error(ATHORIZATION_HEADER_NOT_FOUND, 'Access Token Not found');
    }

    // Get header Authorization
    protected function getAuthorizationHeader()
    {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        }
        else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }
}