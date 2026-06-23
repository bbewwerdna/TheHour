package com.happyhour.model;

import java.util.List;

public class HappyHour {
    private List<String> days;
    private String startTime;
    private String endTime;
    private List<String> drinkDeals;
    private List<String> foodDeals;
    private String description;

    public HappyHour() {}

    public HappyHour(List<String> days, String startTime, String endTime,
                     List<String> drinkDeals, List<String> foodDeals, String description) {
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
        this.drinkDeals = drinkDeals;
        this.foodDeals = foodDeals;
        this.description = description;
    }

    public List<String> getDays() { return days; }
    public void setDays(List<String> days) { this.days = days; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }

    public List<String> getDrinkDeals() { return drinkDeals; }
    public void setDrinkDeals(List<String> drinkDeals) { this.drinkDeals = drinkDeals; }

    public List<String> getFoodDeals() { return foodDeals; }
    public void setFoodDeals(List<String> foodDeals) { this.foodDeals = foodDeals; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
