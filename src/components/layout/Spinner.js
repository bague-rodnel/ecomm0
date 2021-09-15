import styled from 'styled-components';
import pawImage from '../../images/paw-solid.svg';
import pawImageAlt from '../../images/paw-solid-alt.svg';

const Wrapper = styled.div`
	min-height: 33vh;

	text-align: center;
	color: #57A3B2;

	display: flex;
	justify-content: center;

`;


const Paw = styled.img`
  width: 1.6rem;
	margin: 0 0.3rem;
	transform: ${ props => props.left ? 'rotate(75deg)' : 'rotate(105deg)' };
	animation: fadeIn ${ props=>props.duration } linear ${ props=>props.delay } infinite;

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		25% {
			opacity: 1;
		}
		50% {
			opacity: 1;
		}
		75% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
`;

const Spinner = ({message}) => (
	<Wrapper>
		<Paw left delay='0s' duration='2s' src={pawImage} alt="paw" />
		<Paw right delay='0.25s' duration='2s' src={pawImageAlt} alt="paw" />
		<Paw left delay='0.5s' duration='2s' src={pawImage} alt="paw" />
	</Wrapper>
);

export default Spinner;