package com.happyhour.service;

import com.happyhour.model.HappyHour;
import com.happyhour.model.Restaurant;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RestaurantService {

    private final List<Restaurant> restaurants;

    public RestaurantService() {
        this.restaurants = buildSeedData();
    }

    public List<Restaurant> findAll() {
        return restaurants;
    }

    public Optional<Restaurant> findById(Long id) {
        return restaurants.stream().filter(r -> r.getId().equals(id)).findFirst();
    }

    public List<Restaurant> search(String name, String day, String location) {
        return restaurants.stream()
                .filter(r -> name == null || name.isBlank() ||
                             r.getName().toLowerCase().contains(name.toLowerCase()))
                .filter(r -> day == null || day.isBlank() ||
                             r.getHappyHour().getDays().contains(day))
                .filter(r -> matchesLocation(r, location))
                .collect(Collectors.toList());
    }

    // Matches a free-text location against either the city name (case-insensitive
    // contains) or the ZIP code (prefix match, so "941" matches all 941xx zips).
    private boolean matchesLocation(Restaurant r, String location) {
        if (location == null || location.isBlank()) return true;
        String q = location.trim().toLowerCase();
        boolean cityMatch = r.getCity() != null && r.getCity().toLowerCase().contains(q);
        boolean zipMatch = r.getZip() != null && r.getZip().startsWith(q);
        return cityMatch || zipMatch;
    }

    // Real Houston-area restaurants with happy hour offerings. Happy hour details
    // were compiled from public listings in 2025-2026 and can change — always
    // confirm with the restaurant before visiting.
    private List<Restaurant> buildSeedData() {
        return List.of(
            new Restaurant(1L, "The Original Ninfa's on Navigation", "2704 Navigation Blvd, East End",
                "Houston", "77003",
                "(713) 228-1175", "Mexican", 4.5, 29.7503, -95.3382,
                new HappyHour(
                    List.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"),
                    "3:00 PM", "6:30 PM",
                    List.of("$7 Original Ninfarita", "$8 Tex-Mex cocktails", "$4 draft beers"),
                    List.of("Discounted queso & guacamole", "Chips & salsa specials", "Tacos al carbon"),
                    "The birthplace of the fajita. Weekday happy hour on the patio with the legendary Ninfarita and Tex-Mex bites."
                )
            ),
            new Restaurant(2L, "Eight Row Flint", "1039 Yale St, The Heights",
                "Houston", "77008",
                "(832) 767-4002", "American Gastropub", 4.4, 29.7903612, -95.3993295,
                new HappyHour(
                    List.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"),
                    "11:00 AM", "6:00 PM",
                    List.of("$5 draft beers", "$7 seasonal cocktails", "$8 wine by the glass", "$10 frozen gin & tonic"),
                    List.of("$3 street tacos", "Queso & chips", "Snack specials"),
                    "Heights icehouse with a massive whiskey list, frozen cocktails, and gourmet tacos on a sprawling patio."
                )
            ),
            new Restaurant(3L, "Loro Asian Smokehouse & Bar", "1001 W 11th St, The Heights",
                "Houston", "77008",
                "(713) 930-2326", "Asian BBQ", 4.5, 29.7908045, -95.4073475,
                new HappyHour(
                    List.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"),
                    "2:00 PM", "6:00 PM",
                    List.of("$4 beers", "$5 cocktails", "$2 off boozy slushies"),
                    List.of("Smoked brisket bites", "Half-price spicy chicken", "Dumpling specials"),
                    "Asian smokehouse from Aaron Franklin and Tyson Cole — Central Texas BBQ meets Southeast Asian flavors."
                )
            ),
            new Restaurant(4L, "Axelrad Beer Garden", "1517 Alabama St, Midtown",
                "Houston", "77004",
                "(713) 597-8800", "Beer Garden", 4.4, 29.7405, -95.3776,
                new HappyHour(
                    List.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"),
                    "4:00 PM", "7:00 PM",
                    List.of("$4 well drinks", "$3.50 beer of the day", "$2 off frozen cocktails", "$5 micheladas"),
                    List.of("$5 Luigi's pizza slices", "Snack specials"),
                    "Laid-back Midtown beer garden with hammocks under the oaks, live music, and pizza from Luigi's next door."
                )
            ),
            new Restaurant(5L, "Better Luck Tomorrow", "544 Yale St, The Heights",
                "Houston", "77007",
                "(713) 802-0845", "Cocktail Bar", 4.4, 29.781221, -95.398613,
                new HappyHour(
                    List.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"),
                    "2:00 PM", "5:00 PM",
                    List.of("Half-price cocktails", "Half-price beer", "Half-price wine by the glass"),
                    List.of("The Tomorrow Burger", "Trash Can Nachos", "Snack specials"),
                    "Bobby Heugel and Justin Yu's beloved Heights bar, famous for the Tomorrow Burger and serious cocktails."
                )
            ),
            new Restaurant(6L, "Winnie's", "3622 Main St, Midtown",
                "Houston", "77002",
                "(713) 520-0660", "Cajun-Creole", 4.4, 29.7388485, -95.379544,
                new HappyHour(
                    List.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"),
                    "3:00 PM", "6:00 PM",
                    List.of("$6 house cocktails", "Draft beer specials", "Wine by the glass"),
                    List.of("$2 Gulf oysters", "$1.50 wings", "Daily food specials"),
                    "Bright Midtown Cajun-Creole bar with a raw oyster bar and one of the best patios in the neighborhood."
                )
            ),
            new Restaurant(7L, "Incanto", "1426 Yale St, The Heights",
                "Houston", "77008",
                "(281) 888-7609", "Italian", 4.5, 29.7929, -95.3991,
                new HappyHour(
                    List.of("Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"),
                    "4:00 PM", "7:00 PM",
                    List.of("50% off cocktails", "$7 beers", "Wine specials"),
                    List.of("Gulf oysters from $12/dozen", "Wood-fired pizza", "Antipasti specials"),
                    "Heights Italian spot pairing wood-fired pizza and Gulf oysters with an inventive cocktail program."
                )
            ),
            new Restaurant(8L, "Mi Luna Tapas Restaurant & Bar", "888 Westheimer Rd Ste 126, Montrose",
                "Houston", "77006",
                "(281) 888-7649", "Spanish Tapas", 4.3, 29.7429, -95.3905,
                new HappyHour(
                    List.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"),
                    "3:00 PM", "6:00 PM",
                    List.of("$5 sangria", "$6 wine by the glass", "$5-$10 cocktails"),
                    List.of("$5 patatas bravas", "$6 albóndigas (meatballs)", "Empanada specials"),
                    "Family-owned Spanish tapas bar in Montrose with flamenco nights and shareable small plates."
                )
            )
        );
    }
}
