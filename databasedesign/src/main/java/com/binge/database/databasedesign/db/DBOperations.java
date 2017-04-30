package com.binge.database.databasedesign.db;

import org.json.JSONArray;
import org.json.JSONObject;

import com.binge.database.databasedesign.bean.DataBean;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import com.mongodb.client.model.Indexes;

public class DBOperations {

	private static DBOperations instance = null;
	
	private DBOperations(){
	}
	
	static{
		instance = new DBOperations();
	}

	public static DBOperations getInstance() {
		return instance;
	}
	
	  private double distance(double lat1, double lon1, double lat2, double lon2) {
	      double theta = lon1 - lon2;
	      double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
	      dist = Math.acos(dist);
	      dist = rad2deg(dist);
	      dist = dist * 60 * 1.1515;
	      return (dist);
	    }
	  private double deg2rad(double deg) {
	      return (deg * Math.PI / 180.0);
	    }
	  private double rad2deg(double rad) {
	      return (rad * 180.0 / Math.PI);
	    }
	  
	public JSONArray getResult(double mongolatitude,double mongolongitude) throws Exception
	{
		MongoClient mongo = null;
		JSONArray jsonarray = new JSONArray();
		try
		{
			mongo = DBConnections.getInstance().getConnection();
			DB database = mongo.getDB("yelp");
			DBCollection collection = database.getCollection("business");	
			
			//collection.ensureIndex(new BasicDBObject("loc", "2d"), "geospatialindex");
			BasicDBList geocord = new BasicDBList();
			geocord.add(mongolongitude);
			geocord.add(mongolatitude);
				
			BasicDBObject geometry = new BasicDBObject("type","Point");
			geometry.append("coordinates", geocord);
			BasicDBObject query = new BasicDBObject();
			BasicDBObject near = new BasicDBObject("$geometry", geometry);
			near.append("$maxDistance", 500000); // CHANGED
			query.append("$nearSphere", near);	
			BasicDBObject query1 = new BasicDBObject();
			query1.append("loc", query);
			System.out.println(collection.find(query1).count());
			DBCursor cursor = collection.find(query1).limit(30);
			while(cursor.hasNext())
			{
				BasicDBObject dbobj = (BasicDBObject) cursor.next();
				System.out.println(dbobj.getString("name"));
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("Name", dbobj.getString("name"));
				jsonObject.put("Full Address", dbobj.getString("full_address"));
				jsonObject.put("City",dbobj.getString("city"));
				jsonObject.put("State", dbobj.getString("state"));
				BasicDBList categories = (BasicDBList) dbobj.get("categories");
				BasicDBObject attributes = (BasicDBObject) dbobj.get("attributes");
				jsonObject.put("Categories", categories);
				jsonObject.put("Attributes", attributes);
				double lat = dbobj.getDouble("latitude");
				double lan = dbobj.getDouble("longitude");
				BasicDBObject hours = (BasicDBObject) dbobj.get("hours");
				jsonObject.put("Hours", hours);
				jsonObject.put("Reviews", dbobj.get("review_count"));
				jsonObject.put("Stars", dbobj.get("stars"));
				jsonObject.put("Distance", Math.round(distance(mongolatitude,mongolongitude,lat,lan)*100.0)/100.0);
				jsonarray.put(jsonObject);
			}
			return jsonarray;
		
		}
		catch(MongoException me)
        {
			me.printStackTrace();
		     throw new Exception("issue here");
        }
			
	}
}
