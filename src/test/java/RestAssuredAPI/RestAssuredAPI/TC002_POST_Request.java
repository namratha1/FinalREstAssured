package RestAssuredAPI.RestAssuredAPI;
import org.json.simple.JSONObject;
import org.testng.annotations.Test;

import io.restassured.RestAssured;
import io.restassured.http.Method;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import junit.framework.Assert;


public class TC002_POST_Request {
	
	
	@Test
	public void RegistrationCustomer()
	{
		//specify base URI
		RestAssured.baseURI="https://restapi.demoqa.com/customer";
		
		//Specify the Request object or method
		RequestSpecification httpRequest=RestAssured.given();
		
		
		//Post the request data in json format parameters to get response from server
		
		//Request payload is in Json format and parameters are passed with POST request
		JSONObject requestparams=new JSONObject();
		
		requestparams.put("FirstName", "Namy11");
		requestparams.put("LastName", "Gumma11");
		requestparams.put("UserName", "Namy12345");
		requestparams.put("Password", "Namy123@");
		requestparams.put("Email", "Namy11@gmail.com");
		
		httpRequest.header("content-type","application/json");
		httpRequest.body(requestparams.toJSONString());
		
		//Response Object to store response of API
		Response response=httpRequest.request(Method.POST,"/register");
				
		
		//Print response in console
		String responseBody= response.getBody().asString();
		
		System.out.println("Response Body is: "+responseBody);
		
		//Get Status Code
		int statuscode=response.getStatusCode();
		System.out.println("status code is: "+ statuscode);
		Assert.assertEquals(statuscode,201);
		
		//verify the success code from response body
		String successcode=response.jsonPath().get("SuccessCode");
		Assert.assertEquals(successcode,"OPERATION_SUCCESS");
	}
	

}
