import styled from '@emotion/styled'
import { mode } from '@chakra-ui/theme-tools'

export const PaddedDiv = styled.div`
padding: 2rem;
`;

export const NumericInput = styled.input`
margin: 1rem;
border: 1px solid #ccc;
border-radius: 4px;
font-size: 1rem;
color: #333;
`;

export const FileDiv = styled.div`
margin: 1rem;
width: 300px;
height: 60px;
border: 1px solid #ccc;
border-radius: 4px;
color: #333;
background-color: ${mode('#edf5e1', '#05386b')};;
`;

export const Format = styled.p`
justify-content: justify;
font-size: 1rem;
font-style: italic;
`;

export const Label = styled.label`
font-size: 1rem;
font-weight: bold;
`;

export const FilesDiv = styled.div`
display: flex;
    box-sizing: border-box;
    width: 50%;
    height: 350px;
    max-height: 25vh;
    padding: 16px 20px;
    overflow: auto;
    color: #333;
    background: ${mode('#edf5e1', '#05386b')};;
    border-radius: 6px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

export const JustifiedText = styled.p`
justify-content: justify;
text-align: justify;
font-size: 1rem;
`;