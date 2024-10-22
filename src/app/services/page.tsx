import "./services.css";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faUserCog, faFolderOpen, faChartLine, faCogs } from '@fortawesome/free-solid-svg-icons';


export default function Services() {
    return (
        <>
            <div className=" items-center flex justify-center pt-14  mb-20 w-full  servicesdive">

                <div className="flex flex-col p-4 m-4 servicescards">
                    <h1><FontAwesomeIcon icon={faUserCog} /></h1>
                    <h2 className="mt-4 text-bd text-xl">User Management</h2>
                    <p className='text-m text-black opacity-65 mt-4'>Manage and support users by editing profiles, resolving queries, and ensuring a safe, engaging environment for everyone.</p>
                    <a className=" flex flex row  justify-items-center items-center " href="/">
                        Manage Users <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
                    </a>
                </div>

                <div className="flex flex-col p-4 m-4 servicescards">
                    <h1><FontAwesomeIcon icon={faFolderOpen} /></h1>
                    <h2 className="mt-4 text-bd text-xl">Content Management</h2>
                    <p className='text-m text-black opacity-65 mt-4'>Add, edit, or remove resources from the mental health library to ensure users have access to the latest and most relevant information.</p>
                    <a className=" flex flex row  justify-items-center items-center " href="/">
                        Manage Content <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
                    </a>
                </div>

                <div className="flex flex-col p-4 m-4 servicescards">
                    <h1><FontAwesomeIcon icon={faCogs} /></h1>
                    <h2 className="mt-4 text-bd text-xl">Settings and Configuration</h2>
                    <p className='text-m text-black opacity-65 mt-4'>Adjust platform settings, permissions, and configurations to maintain a tailored experience for both users and administrators.</p>
                    <a className=" flex flex row  justify-items-center items-center " href="/">
                        Manage Settings <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
                    </a>
                </div>

                <div className="flex flex-col p-4 m-4 servicescards">
                    <h1><FontAwesomeIcon icon={faChartLine} /></h1>
                    <h2 className="mt-4 text-bd text-xl">Reports and Analytics</h2>
                    <p className='text-m text-black opacity-65 mt-4'>Gain insights into user engagement, platform performance, and more to help you make informed decisions and improve the user experience.</p>
                    <a className=" flex flex row  justify-items-center items-center " href="/">
                        Gain insights <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
                    </a>
                </div>

            </div>
        </>
    );
}