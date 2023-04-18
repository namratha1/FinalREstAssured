package DataDriven;

import java.io.IOException;

import org.json.simple.JSONObject;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import io.restassured.RestAssured;
import io.restassured.http.Method;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import junit.framework.Assert;

public class DtatDrivenAPI {
	
	@Test(dataProvider="employeedata")
	public void TestdataEmployee(String ename,String esal,String eage)

	{
		
		RestAssured.baseURI="http://dummy.restapiexample.com/api/v1";
		
		RequestSpecification httpRequest=RestAssured.given();
		
		JSONObject requestparams=new JSONObject();
		
		requestparams.put("name",ename);
		requestparams.put("salary",esal);
		requestparams.put("age",eage);
		
		httpRequest.header("Content-Type","application/json");
		httpRequest.body(requestparams.toJSONString());
		
		Response response=httpRequest.request(Method.POST,"/create");
		
		String responsebody=response.getBody().asString();
		
		System.out.println("response body is" + responsebody);
		
		Assert.assertEquals(responsebody.contains(ename),true);
		Assert.assertEquals(responsebody.contains(esal),true);
		Assert.assertEquals(responsebody.contains(eage),true);
		
		int statuscode=response.getStatusCode();
		Assert.assertEquals(statuscode,200);
		
	
		
	}



	@DataProvider(name="employeedata")
	public String[][] getmultipleTestData() throws IOException
	{
		//passing the excel sheet values from the XLUtils file function
		String path=System.getProperty("user.dir")+"/src/test/java/DataDriven/empnew.xlsx";
		
		int rowval=XLUtils.getRowCount(path,"sheet");
		int colval=XLUtils.getCellCount(path,"sheet",1);
		
		String empdata[][]=new String[rowval][colval];
		
		for(int i=1;i<=rowval;i++)
		{
			for(int j=0;j<colval;j++)
			{
				empdata[i-1][j] = XLUtils.getCellData(path,"sheet",i,j);
			}
		}
		
		// Passing the array values to the Data driven API above by manually entering the array elements below
		//String empdata[][]={{"abc001","30000","30"},{"lmn002","40000","40"},{"efg003","50000","45"}};
		return(empdata);
		
	}
	
	
	
}



