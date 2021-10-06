import { useState } from 'react'
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo'
import { getauthorsquery, addBookmutation, getBooksQuery } from './queries'

import React from 'react';


type authors = {
    name: string,
    id: string
}
function AddBook(props: any) {
    console.log(props)
    const initialized = {
        book: '',
        genere: '',
        authorId: ''
    }
    const [form, setform] = useState(initialized)
    const [authors, setauthors] = useState<authors[] | null>(null)


    const authorss = () => {
        var data = props.getauthorsquery;
        if (data.loading) {
            return "loading"
        }
        else {
            console.log(props)
            return data.authors.map((item: authors) => <option key={item.id} value={item.id}>{item.name}</option>)
        }
    }


    const handlesubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      props.addBookmutation({
          variables:{
              name:form.book,
              genere:form.genere,
              authorId:form.authorId,
          },
          refetchQueries:[{query:getBooksQuery}]
      })
      setform(initialized)
    }
    return (
        <div>
            <form>
                <label htmlFor="book">
                    book: <input type="text" id="book" placeholder="Book name" name="book" value={form.book}

                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setform({ ...form, [e.target.name]: e.target.value }) }} />

                </label>
                <label htmlFor="genere">
                    genere: <input type="text" value={form.genere} id="genere" placeholder="genere name" name="genere" onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setform({ ...form, [e.target.name]: e.target.value }) }} />


                </label>
                <label htmlFor="author">
                    author: <select id="author" value={form.authorId} name="author" onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => { setform({ ...form, [e.target.name]: e.target.value }) }} >

                        <option>authors</option>
                        {authorss()}

                    </select>

                </label>
            </form>
            <button onClick={handlesubmit}>submit</button>
        </div>
    )
}


export default compose(
    graphql(getauthorsquery, { name: 'getauthorsquery' }),
    graphql(addBookmutation, { name: 'addBookmutation' })
)(AddBook)
/* I have completed  my BTech in year 2020 from SASTRA post completion of my college i got placed into cognizant where i have worked for an year as programmer analyst aligned under angular domain ,my responsibilites in the project were to develop efficient code and bug free code and to work on unit testing of the same.Parallely i took training from online platform Edyoda to get trained for MERN developer and using these  skills i had done various projects and upskilled myself.and also completed some certifications from hackkerrank like javascript basics,react etc as a result of this these works i have gained a valuable experience in front end technologies

192418 type- project work
My name is Sashank, and I'm an associate Associate Technology L1_XT - React in Publicis Sapient Bangalore. I have joined in the year 2021,sept27th and I'm looking forward to being a pillar of the organization and contribute my knowledge and skills through various projects.
*/
