import React from 'react';

type props = {
    href?: string;
    text?: string;
};

const EcardSocialElement = ({ href, text } : props) => (
    <a href={href} className="text-sm underline">
        {text || 'Redes Sociales'}
    </a>
);

export default EcardSocialElement;