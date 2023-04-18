package RestAssuredAPI.RestAssuredAPI;
import org.testng.annotations.Test;

import io.restassured.RestAssured;
import io.restassured.authentication.PreemptiveBasicAuthScheme;
import io.restassured.http.Method;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import junit.framework.Assert;

public class TC007_GET_Request {
	
	
	@Test
	public void Authentication()
	{
	
      RestAssured.baseURI="https://restapi.demoqa.com/authentication/CheckForAuthentication";
		
      
      PreemptiveBasicAuthScheme auth=new PreemptiveBasicAuthScheme();
      auth.setUserName("ToolsQA");
      auth.setPassword("TestPassword");
      
      RestAssured.authentication=auth;
      
		//Specify the Request object or method
		RequestSpecification httpRequest=RestAssured.given();
		
		
		//Response Object to store response of API
		Response response=httpRequest.request(Method.GET,"/");
		
		//Print response in console
		String responseBody= response.getBody().asString();
		System.out.println("Response Body is: "+responseBody);
		
		
		int statuscode=response.getStatusCode();
		System.out.println("status code is: "+ statuscode);
		Assert.assertEquals(statuscode,200);
		
	}

}
