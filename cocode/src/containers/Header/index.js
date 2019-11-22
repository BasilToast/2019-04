import React, { useState, useEffect } from 'react';
import * as Styled from './style';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { API, DEFAULT_REQUEST_OPTION } from 'config';

import Logo from 'components/Logo';
import Modal from 'components/Modal';
import UserProfile from 'components/UserProfile';
import ModalPortal from 'components/ModalPortal';
import LoginModalBody from 'components/LoginModalBody';

function Header() {
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const handleOpenSignInModal = () => setIsSignInModalOpen(true);
	const handleCloseSignInModal = () => {
		const root = document.getElementById('root');
		root.style.overflow = 'overlay';
		setIsSignInModalOpen(false);
	};

	const [user, setUser] = useState(null);

	const getJwtToken = async () => {
		const { data } = await axios.get(
			API.getUserData,
			DEFAULT_REQUEST_OPTION
		);
		if (data) setUser(data.data);
	};

	useEffect(() => {
		getJwtToken();
	}, []);

	return (
		<Styled.Header>
			<Link to="/">
				<Logo />
			</Link>
			{user ? (
				<UserProfile username={user.username} avatar={user.avatar} />
			) : (
				<>
					<Styled.SignInButton onClick={handleOpenSignInModal}>
						Sign In
					</Styled.SignInButton>
					{isSignInModalOpen && (
						<ModalPortal>
							<Modal
								modalBody={<LoginModalBody />}
								onClose={handleCloseSignInModal}
							/>
						</ModalPortal>
					)}
				</>
			)}
		</Styled.Header>
	);
}

export default Header;
