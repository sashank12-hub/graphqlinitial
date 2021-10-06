import React from 'react'
import { useQuery } from '@apollo/client';
import { graphql } from 'react-apollo'
import { getBookquery, getBooksQuery } from './queries'


function Books(props: any) {
    // const { loading, error, data ,refetch} =  useQuery(getBookquery, {
    //     variables:{
    //         id:''
    //     }
    // })
  // console.log(data)

    const handleClick =(event: React.MouseEvent<HTMLButtonElement>) => {
        
        event.preventDefault();
      //  refetch({id:(event.target as Element).id})
        
      
       
    }
    const books = () => {
        var data = props.data;
        if (data.loading) return 'loading'
        else {
           
                return data.books.map((item: any, index: number) => <button onClick={(e)=>handleClick(e)} id={item.id} key={item.id}>{item.name}</button>)

            
        }
    }

    return (
        <div>
            {books()}

        </div>
    )
}

export default graphql(getBooksQuery)(Books)
