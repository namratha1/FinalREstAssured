package RestAssuredAPI.RestAssuredAPI;
import org.testng.annotations.Test;

import io.restassured.RestAssured;
import io.restassured.http.Header;
import io.restassured.http.Headers;
import io.restassured.http.Method;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import junit.framework.Assert;


public class TC005_GET_Request {
	
	@Test
	public void ValidateJsonResponse()
	{
		
 RestAssured.baseURI="https://restapi.demoqa.com/utilities/weather/city";
		
		//Specify the Request object or method
		RequestSpecification httpRequest=RestAssured.given();
		
		
		//Response Object to store response of API
		Response response=httpRequest.request(Method.GET,"/Kolkata");
		
		//Print response in console
		String responseBody= response.getBody().asString();
		
		System.out.println("Response Body is: "+responseBody);
		
		Assert.assertEquals(responseBody.contains("Kolkata"),true);
		
	}
		
		
	

}
