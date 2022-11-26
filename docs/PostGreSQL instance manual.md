# Setting manual start-up and stop the instance
1. Press _**Win+R**_ combination keys.
2. Type in the prompt _**services.msc**_ and press enter.
3. Search for PostreSQL instace (it should be named as _**postresql-x64-15**_ for version 15 on Windows).
4. Right click -> Properties -> Type of start: set to _**Manual**_ -> Apply -> OK
5. Right click on _**postresql-x64-15**_ instance -> Stop

# Start the instance
1. Press _**Win+R**_ combination keys.
2. Type in the prompt _**services.msc**_ and press enter.
3. Search for PostreSQL instace (it should be named as _**postresql-x64-15**_ for version 15 on Windows).
5. Right click on _**postresql-x64-15**_ instance -> Start

**Remember!**
PostreSQL instance takes in my case ca. 20% of processor usage when started!