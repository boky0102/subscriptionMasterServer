
declare namespace Express{
    export interface Request{
        userId? : string | import("jsonwebtoken").JwtPayload
    }
    
}

type subscriptionCategories =
     | 'Streaming service'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';

interface UserCategoryColors {
        category: subscriptionCategories,
        color: string
    }



