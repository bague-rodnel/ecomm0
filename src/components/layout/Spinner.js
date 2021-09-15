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
  position: relative;
  width: 2.25rem;
	margin: 0 0.5rem;
	top: ${ props=>props.left ? '-0.5rem' : 0 };
	transform: ${ props => props.left ? 'rotate(75deg)' : 'rotate(105deg)' };
	animation: fadeIn ${ props=>props.duration } linear ${ props=>props.delay } infinite;

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		25% {
			opacity: 0;
		}
		50% {
			opacity: 0;
		}
		75% {
			opacity: 1;
		}
		100% {
			opacity: 1;
		}
	}
`;

const Spinner = () => (
	<Wrapper>
		<Paw left delay='0s' duration='0.8s' src={pawImage} alt="" />
		<Paw right delay='0.15s' duration='0.8s' src={pawImageAlt} alt="" />
		<Paw left delay='0.3s' duration='0.8s' src={pawImage} alt="" />
	</Wrapper>
);

export default Spinner;