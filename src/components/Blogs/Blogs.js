import React from "react";
import useTitle from "../../hooks/useTitle";

const Blogs = () => {
    useTitle("Blogs");
    return (
        <div className=" w-2/3 mx-auto"> 
            <section className=" mb-9">
                <h3 className="text-3xl">
                    What are the different ways to manage a state in a React
                    application?
                </h3>
                <p>
                    Ans: There are four main types of state you need to properly
                    manage in your React apps: <br /> Local state
                    <br /> Global state <br />
                    Server state <br />
                    URL state <br />
                    Let's cover each of these in detail: Local (UI) state -
                    Local state is data we manage in one or another component.
                    Local state is most often managed in React using the
                    useState hook. For example, local state would be needed to
                    show or hide a modal component or to track values for a form
                    component, such as form submission, when the form is
                    disabled and the values of a form's inputs.
                </p>
            </section >
            <section className=" mb-9">
                <h3 className="text-3xl">
                    How does prototypical inheritance work?
                </h3>
                <p>
                    বাংলায় In English The Prototypal Inheritance is a feature in
                    javascript used to add methods and properties in objects. It
                    is a method by which an object can inherit the properties
                    and methods of another object. Traditionally, in order to
                    get and set the [[Prototype]] of an object, we use Object.
                </p>
            </section>
            <section className=" mb-9">
                <h3 className="text-3xl">React vs. Angular vs. Vue?</h3>
                <p>
                    Ans: Vue provides higher customizability and hence is easier
                    to learn than Angular or React. Further, Vue has an overlap
                    with Angular and React with respect to their functionality
                    like the use of components. Hence, the transition to Vue
                    from either of the two is an easy option.
                </p>
            </section>
            <section>
                <h3 className="text-3xl">
                    What is a unit test? Why should we write unit tests?
                </h3>
                <p>
                    Ans: The main objective of unit testing is to isolate
                    written code to test and determine if it works as intended.
                    Unit testing is an important step in the development
                    process, because if done correctly, it can help detect early
                    flaws in code which may be more difficult to find in later
                    testing stages.
                </p>
            </section>
        </div>
    );
};

export default Blogs;
