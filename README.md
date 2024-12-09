High-Fidelity Prototype README
Nick Pyun, Maroua Bezzaoui, Taralyn Nguyen, Varsha Saravanan


**Introduction**
Research shows that 85% of career success depends on interpersonal skills, yet many students and early career professionals struggle to develop them. Our app turns skill-building into an exciting journey with personalized challenges, growth tracking tools, and opportunities to compete with friends, helping you unlock your true potential. 

Design Tools
We developed our high-fidelity prototype using React Native and Expo. During the development process, we leveraged the Xcode Simulator to run and test the app. Navigation was implemented through Stack Navigation using the Expo Router. For the design phase, we used Figma to create and prototype the Medium-Fidelity design of our app.

Operating Instructions
Installation and Accessing the Source Code
Download the code from our Level Up GitHub Repository
Download Expo and npm
Alternatively, Apple’s XCode Simulator works as well
Open in VS Code or the IDE of your choice
Run npm install
Run npx expo and open either on Expo Go or the XCode Simulator.
You should be taken to the app's home screen. From here, you can navigate to different tabs, click buttons on screens, and carry out other interactions. 
Please note that this app was built using the dimensions of the iPhone 15. Slight discrepancies in sizing and dimensions may be present when running the app on mobile devices that are not iPhone 15.

Operation
The app's landing page is the Home page, providing users with an intuitive starting point. A navigation bar at the bottom of the screen allows access to key sections: My Experiences, Challenge Log, Leaderboard, and Profile. From these pages, users can carry out three distinct task flows 1) access and complete diverse experiences 2) compete with friends, and 3) track personal progress over time.

Limitations
Although we have attempted to implement much of the proposed functionality, some parts of the design could not be implemented given the limited time frame. Please note the following:
Our app’s UI is compatible with the iPhone 15 dimensions. Other dimensions may cause certain parts to be cut off
Our app may require occasional resets to the Supabase database from our end due to its XP progression system. This involves resetting specific values in Graph_data, Tasks, and Users tables, ensuring proper functionality and progression consistency.
We were unable to implement an onboarding flow where users can “Sign Up” or “Log In” thereby using/creating their accounts, as mapped out in our design.
While the reflection box on the experience details pages allows for text inputs, the inputted information does not save in our backend database and therefore does not reflect when the page is refreshed. 
If a user receives a challenge of an experience they haven’t unlocked yet, they are still able to access it. This is because currently, the task flow has the experiences randomly assigned. Ideally, users should see a message such as 'You have not yet unlocked this experience’ when accessing locked experiences.
After the user marks an experience as completed, we allow users to undo this in case it is necessary. While the XP counters throughout the app decrement when undone, the progress graph on the profile page is not set to reflect this.
Additionally, several features are hardcoded or simulated for demonstration. 

Hard Coded Items
In the Challenge Log, the challenges under “Inbox” and “Sent” are hardcoded such that when a user sends a challenge, the log is not dynamically updated.
The number of friends on the profile page is hardcoded.


Wizard of Oz Techniques 
“Today’s Experience” should recommend a task for the user based on their past activity using a tailored algorithm. However, it currently selects a task randomly from the user’s remaining tasks without considering their activity history.
Clicking “View Task” in the Challenge Log is intended to show the actual task sent to or received from another user. Instead, it navigates to a randomly selected task each time, even from already completed tasks (marked with green check marks) or tasks sent to others.
While other users are displayed to mimic a social network, only one user, Taralyn, is functional. As a result, challenges are not sent to real users, nor can users receive challenges through this prototype.
