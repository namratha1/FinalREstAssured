package RestAssuredAPI.RestAssuredAPI;
import org.testng.annotations.Test;

import io.restassured.RestAssured;
import io.restassured.http.Method;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import junit.framework.Assert;


public class TC003_GET_Request {
	
	@Test
	public void Googlemaps()
	{
		//specify base URI
		RestAssured.baseURI="https://maps.googleapis.com";
		
		//Specify the Request object or method
		RequestSpecification httpRequest=RestAssured.given();
		
		
		//Response Object to store response of API
		Response response=httpRequest.request(Method.GET,"/maps/api/place/nearbysearch/xml?location=-33.8670522,151.1957362&radius=1500&type=supermarket&key=AIzaSyBjGCE3VpLU4lgTqSTDmHmJ2HoELb4Jy1s");
		
		//Print response in console
		String responseBody= response.getBody().asString();
		
		System.out.println("Response Body is: "+responseBody);
		
		//GetHeaders from Postman, validate them in response
		String Contenttype=response.header("Content-Type");
		Assert.assertEquals(Contenttype, "application/xml; charset=UTF-8");
		
		String contentencoding=response.header("Content-Encoding");
		Assert.assertEquals(contentencoding, "gzip");
		
		
	}


}
