import React from "react";
import Feeds1 from "../assets/images/pngs/feeds1.png";
import Feeds2 from "../assets/images/pngs/feeds2.png";
import { Link } from "react-router-dom";

const Feeds = () => {
  return (
    <section id="blogs" className=" feeds__section">
      <div className="container  my-24 mx-auto md:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div
            className="zoom feeds__img__container relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <img
              src={Feeds1}
              className="align-middle w-full h-full object-cover transition duration-300 ease-linear"
            />
            <Link to="/details">
              <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden">
                <div className="flex h-full items-end justify-start">
                  <div className="m-6 text-white">
                    <h5 className="mb-3 text-lg font-bold">
                      How to Increase Your ROI Through scientific SEM?
                    </h5>
                    <p className="p-tag">
                      <small>
                        Published <u>13.01.2022</u> by Anna Maria Doe
                      </small>
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden bg-fixed transition duration-300 ease-in-out"></div> */}
            </Link>
          </div>

          <div className="zoom relativen feeds__img__container__1 overflow-hidden rounded-lg w-[380px] h-[476px] bg-cover bg-no-repeat shadow-lg">
            <img
              src={Feeds2}
              alt="Feed Image"
              className="object-cover w-full h-full transition duration-300 ease-linear"
            />
            <Link to="/details">
              <div className="absolute inset-0 flex items-end justify-start">
                <div className="m-6 text-white">
                  <h5 className="mb-3 text-lg font-bold">
                    How to Increase Your ROI Through scientific SEM?
                  </h5>
                  <p className="p-tag">
                    <small>
                      Published <u>13.01.2022</u> by Anna Maria Doe
                    </small>
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 overflow-hidden transition duration-300 ease-in-out "></div>
            </Link>
          </div>

          <div className="space-y-10">
            <div className="inline-block">
              <div
                className="zoom relative overflow-hidden rounded-lg w-[363px] h-[222px] bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/standard/nature/045.jpg"
                  className="w-full align-middle transition duration-300 ease-linear"
                />

                <Link to="/details">
                  <div className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden">
                    <div className="flex h-full items-end justify-start">
                      <div className="m-6 text-white">
                        <h5 className="mb-3 text-lg font-bold">
                          The Basics of Blogging Search Optimization
                        </h5>
                        <p className="p-tag">
                          <small>
                            Published <u>10.01.2022</u> by Bilbo baggins
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]"></div>
                </Link>
              </div>
            </div>

            <div className="inline-block">
              <div
                className="zoom relative overflow-hidden rounded-lg w-[363px] h-[222px] bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/standard/nature/045.jpg"
                  className="w-full align-middle transition duration-300 ease-linear"
                />
                <a href="#!">
                  <div className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden">
                    <div className="flex h-full items-end justify-start">
                      <div className="m-6 text-white">
                        <h5 className="mb-3 text-lg font-bold">
                          The Basics of Blogging Search Optimization
                        </h5>
                        <p className="p-tag">
                          <small>
                            Published <u>10.01.2022</u> by Bilbo baggins
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    // <section id="blogs" className=" p-3 mb-12">
    //   <div className="container  my-24 mx-auto md:px-6">
    //     <div className="grid gap-6 lg:grid-cols-3">
    //       <div
    //         className="zoom feeds__img__container relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg"
    //         data-te-ripple-init
    //         data-te-ripple-color="light"
    //       >
    //         <img
    //           src={Feeds1}
    //           className="align-middle w-full h-full object-cover transition duration-300 ease-linear"
    //         />
    //         <Link to="/details">
    //           <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.4)] bg-fixed">
    //             <div className="flex h-full items-end justify-start">
    //               <div className="m-6 text-white">
    //                 <h5 className="mb-3 text-lg font-bold">
    //                   How to Increase Your ROI Through scientific SEM?
    //                 </h5>
    //                 <p className="p-tag">
    //                   <small>
    //                     Published <u>13.01.2022</u> by Anna Maria Doe
    //                   </small>
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]"></div>
    //         </Link>
    //       </div>

    //       <div className="zoom relativen feeds__img__container__1 overflow-hidden rounded-lg w-[380px] h-[476px] bg-cover bg-no-repeat shadow-lg">
    //         <img
    //           src={Feeds2}
    //           alt="Feed Image"
    //           className="object-cover w-full h-full transition duration-300 ease-linear"
    //         />
    //         <Link to="/details">
    //           <div className="absolute inset-0 flex items-end justify-start bg-[hsla(0,0%,0%,0.4)] bg-fixed">
    //             <div className="m-6 text-white">
    //               <h5 className="mb-3 text-lg font-bold">
    //                 How to Increase Your ROI Through scientific SEM?
    //               </h5>
    //               <p className="p-tag">
    //                 <small>
    //                   Published <u>13.01.2022</u> by Anna Maria Doe
    //                 </small>
    //               </p>
    //             </div>
    //           </div>
    //           <div className="absolute inset-0 overflow-hidden transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]"></div>
    //         </Link>
    //       </div>

    //       <div className="space-y-10">
    //         <div className="inline-block">
    //           <div
    //             className="zoom relative overflow-hidden rounded-lg w-[363px] h-[222px] bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
    //             data-te-ripple-init
    //             data-te-ripple-color="light"
    //           >
    //             <img
    //               src="https://mdbcdn.b-cdn.net/img/new/standard/nature/045.jpg"
    //               className="w-full align-middle transition duration-300 ease-linear"
    //             />

    //             <Link to="/details">
    //               <div className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden bg-[hsla(0,0%,0%,0.4)] bg-fixed">
    //                 <div className="flex h-full items-end justify-start">
    //                   <div className="m-6 text-white">
    //                     <h5 className="mb-3 text-lg font-bold">
    //                       The Basics of Blogging Search Optimization
    //                     </h5>
    //                     <p className="p-tag">
    //                       <small>
    //                         Published <u>10.01.2022</u> by Bilbo baggins
    //                       </small>
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]"></div>
    //             </Link>
    //           </div>
    //         </div>

    //         <div className="inline-block">
    //           <div
    //             className="zoom relative overflow-hidden rounded-lg w-[363px] h-[222px] bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
    //             data-te-ripple-init
    //             data-te-ripple-color="light"
    //           >
    //             <img
    //               src="https://mdbcdn.b-cdn.net/img/new/standard/nature/045.jpg"
    //               className="w-full align-middle transition duration-300 ease-linear"
    //             />
    //             <a href="#!">
    //               <div className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden bg-[hsla(0,0%,0%,0.4)] bg-fixed">
    //                 <div className="flex h-full items-end justify-start">
    //                   <div className="m-6 text-white">
    //                     <h5 className="mb-3 text-lg font-bold">
    //                       The Basics of Blogging Search Optimization
    //                     </h5>
    //                     <p className="p-tag">
    //                       <small>
    //                         Published <u>10.01.2022</u> by Bilbo baggins
    //                       </small>
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]"></div>
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Feeds;

