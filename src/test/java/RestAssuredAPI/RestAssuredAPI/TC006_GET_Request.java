/*package RestAssuredAPI.RestAssuredAPI;
import org.testng.annotations.Test;

import io.restassured.RestAssured;
import io.restassured.http.Method;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;
import io.restassured.specification.RedirectSpecification;
import io.restassured.specification.RequestSpecification;
import junit.framework.Assert;


public class TC006_GET_Request {

	@Test
	public void ExternalResponse()
	{
		
		RestAssured.baseURI="https://restapi.demoqa.com/utilities/weather/city";
		RequestSpecification httpRequest=RestAssured.given();
		Response response=httpRequest.request(Method.GET,"/Mumbai");
		
		//String responsebody=response.getBody().asString();
		//System.out.println("response body is"+ responsebody);
		
		JsonPath jsonpath=response.jsonPath();
		
		System.out.println(jsonpath.get("City"));
		System.out.println(jsonpath.get("Temperature"));
		System.out.println(jsonpath.get("Humidity"));
		System.out.println(jsonpath.get("WeatherDescription"));
		System.out.println(jsonpath.get("WindSpeed"));
		System.out.println(jsonpath.get("WindDirectionDegree"));
	  
		Assert.assertEquals(jsonpath.get("Temperature"), "28.56 Degree celsius");
	
	}
	
}*/
