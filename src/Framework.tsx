import React, { Component, useState } from 'react';

interface FrameworkProps {
    Name: string
    Version: string
}

export const Framework = (props: any) => {
    return <p>NEW {props.name} UPDATE! Latest found: {props.release.version} </p>;
   }