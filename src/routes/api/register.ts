import { A } from '@solidjs/router';
import type { APIEvent } from 'solid-start';
import { json, createCookieSessionStorage, redirect, XSolidStartResponseTypeHeader } from 'solid-start';

import { createUserSession } from '~/lib/session';


export function GET() {

    return " <h1>Register to this shit fest < /h1>"



}

export type resolve = {
    status: number;
    body: Response;
}

export function POST() {
    // createUserSession("kamp", "/")





    return Promise.resolve({
        status: 200,
        body: new Response("hekki")
    });

}

export function PATCH() {
    // ...
}

export function DELETE() {
    // ...
}