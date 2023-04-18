package RestAssuredAPI.RestAssuredAPI;
import org.testng.annotations.Test;

import io.restassured.RestAssured;
import io.restassured.http.Method;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import junit.framework.Assert;

public class TC001_GET_Request {
	
	
	
	@Test
	public void getwheatherdetails()
	{
		//specify base URI
		RestAssured.baseURI="https://restapi.demoqa.com/utilities/weather/city";
		
		//Specify the Request object or method
		RequestSpecification httpRequest=RestAssured.given();
		
		
		//Response Object to store response of API
		Response response=httpRequest.request(Method.GET,"/Dubai");
		
		//Print response in console
		String responseBody= response.getBody().asString();
		
		System.out.println("Response Body is: "+responseBody);
		
		//Get Status Code
		int statuscode=response.getStatusCode();
		System.out.println("status code is: "+ statuscode);
		Assert.assertEquals(statuscode,200);
		
		String statusline=response.getStatusLine();
		System.out.println("status line is: "+ statusline);
		Assert.assertEquals(statusline,"HTTP/1.1 200 OK");
		
		
	}

}
