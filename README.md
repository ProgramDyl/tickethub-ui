# Overview
TicketHub is a distributed application for purchasing concert tickets. Featuring a Full-Stack Azure workflow, and CI/CD with GitHub actions, allowing users to save and store concert ticket purchases in a SQL database in the cloud. This project began as the final culminating project for Michael Trumbull's INET2007 in Nova Scotia Community College's **IT Programming**. 

The frontend sends JSON data through the pipeline until it ends up in the SQL database. 

## Azure Workflow


```mermaid

sequenceDiagram
    participant React UI
    loop ValidatePurchase
        React UI->>React UI: Customer information valid/<br/>Payment processed
    end
    Note left of React UI: ConcertId is currently<br/> hardcoded in frontend.
    participant API
    loop Validation
        API->>API: Validate JSON
    end
    React UI->>API: JSON Post
    participant Azure StorageQueue
    API->>Azure StorageQueue: JSON
    Azure StorageQueue->>Function App: JSON
    participant Function App 
    loop deserialize json
        Function App->>Function App: Deserialize JSON to base64
    end
    Function App->>Azure MSSQL Database: Base64 Message
    participant Azure MSSQL Database
    
    


```