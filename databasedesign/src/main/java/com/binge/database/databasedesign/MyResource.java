package com.binge.database.databasedesign;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONArray;

import com.binge.database.databasedesign.bean.DataBean;
import com.binge.database.databasedesign.db.DBOperations;

/**
 * Root resource (exposed at "myresource" path)
 */
@Path("myresource")
public class MyResource {

	@Path("data")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@GET
	public Response getURL(@QueryParam("latitude") String latitude,@QueryParam("longitude") String longitude)
			{
				try{
					
					double mongolatitude = Double.parseDouble(latitude);
					double mongolongitude = Double.parseDouble(longitude);					
					JSONArray json =DBOperations.getInstance().getResult(mongolatitude,mongolongitude);
					System.out.println(json.length());
					return Response.ok(json.toString()).header("Access-Control-Allow-Origin", "*").
							header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT").allow("options").build();
				}
				catch(Exception e)
				{
					return Response.status(500).entity(e.getMessage()).build();
				}
				
				
			}
    
}
