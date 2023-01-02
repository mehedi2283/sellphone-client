import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from '.././../assets/logo/web-logo.png'

const Footer = () => {
    return (
        <footer className="footer lg:justify-items-center p-10 bg-base-200 bg-opacity-50 backdrop-blur-lg text-base-content   ">
            <div className="text-center">
                <img className="w-40 mx-auto" src={logo} alt="" />
                <p>
                   Online Store
                    <br />
                    Providing reliable phones since 2020
                </p>
            </div>
            <div>
                <span className="footer-title">Services</span>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </div>
            <div>
                <span className="footer-title">Company</span>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </div>
            <div>
                <span className="footer-title">Legal</span>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </div>
        </footer>
    );
};

export default Footer;
