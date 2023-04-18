package RestAssuredAPI.RestAssuredAPI;
import org.testng.annotations.Test;

import io.restassured.RestAssured;
import io.restassured.http.Header;
import io.restassured.http.Headers;
import io.restassured.http.Method;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

public class TC004_GET_Request {
	
	@Test
	public void printallHearders()
	{
		
		RestAssured.baseURI="https://maps.googleapis.com";
		
		RequestSpecification httpRequest=RestAssured.given();
		
		Response response= httpRequest.request(Method.GET,"/maps/api/place/nearbysearch/xml?location=-33.8670522,151.1957362&radius=1500&type=supermarket&key=AIzaSyBjGCE3VpLU4lgTqSTDmHmJ2HoELb4Jy1s");
		
		String Responsebody=response.getBody().asString();
		System.out.println("response body is:" + Responsebody);
		
		Headers allhearders=response.headers();
		
		for(Header header:allhearders)
			
		{
			System.out.println(header.getName()+ "   "+header.getValue());
			 
		}	
		
	}

}
