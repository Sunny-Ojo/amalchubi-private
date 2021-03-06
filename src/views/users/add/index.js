// ** React Imports
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// ** Store & Actions
import { useDispatch } from 'react-redux';
import Breadcrumbs from '@components/breadcrumbs';

// ** Third Party Components
import {
	Button,
	FormGroup,
	Label,
	FormText,
	Card,
	CardBody,
	CardHeader,
	Media,
	Input,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe';
// ** Reactstrap
import { Row, Col } from 'reactstrap';

// ** Styles
import '@styles/react/apps/app-users.scss';
import axiosClient from '../../../services/axios';
import { registerUserUrl } from '../../../router/api-routes';
import { swal } from '../../../utility/Utils';

const AddUser = (props) => {
	// ** Vars
	const dispatch = useDispatch();
	const history = useHistory();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [newUser, setNewUser] = useState({
		avatar: '',
		first_name: '',
		last_name: '',
		email: '',
		status: '',
		phone_number: '',
		linkedIn_url: '',
		facebook_url: '',
		royal_title: '',
		password: '',
		password_confirmation: '',
		role: '',
	});

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setNewUser({ ...newUser, [name]: value });
	};
	const onSubmit = async (event, errors) => {
		if (!errors.length) {
			event.preventDefault();
			const formData = new FormData();
			formData.append('avatar', newUser?.avatar);
			formData.append('first_name', newUser?.first_name);
			formData.append('last_name', newUser?.last_name);
			formData.append('email', newUser?.email);
			formData.append('status', newUser?.status);
			formData.append('linkedIn_url', newUser?.linkedIn_url);
			formData.append('faceboo_url', newUser?.facebook_url);
			formData.append('royal_title', newUser?.royal_title);
			formData.append('password', newUser?.password);
			formData.append('password_confirmation', newUser?.password_confirmation);
			formData.append('role', newUser?.role);
			try {
				const response = await axiosClient.post(registerUserUrl, formData);
				//  if (response) {
				// if (response.data.status_code === 201) {
				if (response?.status === 201 || 200) {
					swal('Great job!', 'User has been created', 'success');
					history.push(`/users/list`);
				} else {
					swal(
						'Oops!',
						"if you aren't redirected, something wrong must have happened",
						'error'
					);
				}
			} catch (error) {
				setIsSubmitting(false);
				swal('Oops!', error?.response?.data?.message, 'error');
				console.error({ error });
			}
		}
	};
	// ** Get suer on mount
	// useEffect(() => {
	// 	dispatch(getUser(parseInt(id)));
	// }, [dispatch]);

	const onChangeImage = (e) => {
		const reader = new FileReader(),
			files = e.target.files;
		reader.onload = function () {
			setNewUser({ ...newUser, avatar: reader.result });
		};
		reader.readAsDataURL(files[0]);
	};
	return (
		<Fragment>
			<Breadcrumbs
				breadCrumbTitle="Users"
				breadCrumbParent="Users Management"
				breadCrumbActive="Create"
			/>
			<Card className="-user-view">
				<CardHeader>
					<h2>Add New User</h2>
				</CardHeader>
				<CardBody>
					<AvForm onSubmit={onSubmit}>
						<Media>
							<Media className="mr-25 mb-3" left>
								{newUser?.avatar && (
									<Media
										object
										className="rounded mr-50"
										src={newUser.avatar}
										alt="Generic placeholder image"
										height="150"
										width="150"
									/>
								)}
							</Media>
							<Media className="mt-75 ml-1" body>
								<Button.Ripple
									tag={Label}
									className="mr-75"
									size="sm"
									color="primary"
								>
									Upload Profile Image
									<Input
										type="file"
										onChange={onChangeImage}
										hidden
										accept="image/*"
									/>
								</Button.Ripple>

								<p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
							</Media>
						</Media>
						<Row>
							<Col md="6">
								<FormGroup>
									<Label for="first_name">First Name</Label>
									<AvInput
										name="first_name"
										id="first_name"
										placeholder="John"
										value={newUser.first_name}
										onChange={(e) => handleChangeInput(e)}
										// required
									/>
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup>
									<Label for="last_name">Last Name</Label>
									<AvInput
										name="last_name"
										id="last_name"
										placeholder="Doe"
										value={newUser.last_name}
										onChange={(e) => handleChangeInput(e)}
										// required
									/>
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup>
									<Label for="email">Email</Label>
									<AvInput
										type="email"
										name="email"
										id="email"
										value={newUser.email}
										onChange={(e) => handleChangeInput(e)}
										placeholder="john.doe@example.com"
										// required
									/>
									<FormText color="muted">
										You can use letters, numbers & periods
									</FormText>
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup>
									<Label for="phone_number">Phone Number</Label>
									<AvInput
										name="phone_number"
										id="phone_number"
										placeholder="+2341223949586"
										value={newUser.phone_number}
										onChange={(e) => handleChangeInput(e)}
										// required
									/>
								</FormGroup>
							</Col>

							<Col md="6">
								<FormGroup>
									<Label for="facebook_url">Facebook Url</Label>
									<AvInput
										name="facebook_url"
										id="facebook_url"
										placeholder="+2341223949586"
										value={newUser.facebook_url}
										onChange={(e) => handleChangeInput(e)}
										// required
									/>
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup>
									<Label for="linkedIn_url">LinkedIn Url</Label>
									<AvInput
										name="linkedIn_url"
										id="linkedIn_url"
										value={newUser.linkedIn_url}
										onChange={(e) => handleChangeInput(e)}
										placeholder="Australia"
										// required
									/>
								</FormGroup>
							</Col>

							<Col md="6">
								<FormGroup>
									<Label for="role">User Role</Label>
									<AvInput
										onChange={(e) => handleChangeInput(e)}
										type="select"
										id="role"
										name="role"
										// required
									>
										<option value="admin">Admin</option>
										<option value="member">Member</option>
									</AvInput>
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup>
									<Label for="royal_title">Royal Title</Label>
									<AvInput
										name="royal_title"
										id="royal_title"
										value={newUser.royal_title}
										onChange={(e) => handleChangeInput(e)}
										placeholder="Australia"
										// required
									/>
								</FormGroup>
							</Col>
							<Col md="12" sm="12">
								<FormGroup>
									<Label for="status">Status</Label>
									<Input
										onChange={(e) => handleChangeInput(e)}
										type="select"
										name="status"
										id="status"
									>
										{/* <option value="pending">Pending</option> */}
										<option value="1">Active</option>
										<option value="0">Inactive</option>
									</Input>
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup>
									<Label for="password">Password</Label>
									<AvInput
										name="password"
										id="password"
										placeholder="password"
										value={newUser.password}
										onChange={(e) => handleChangeInput(e)}
										// required
										type="password"
									/>
								</FormGroup>
							</Col>

							<Col md="6">
								<FormGroup>
									<Label for="password_confirmation">
										Password Confirmation
									</Label>
									<AvInput
										name="password_confirmation"
										id="password_confirmation"
										placeholder="password confirmation"
										value={newUser.password_confirmation}
										onChange={(e) => handleChangeInput(e)}
										// required
										type="password"
									/>
								</FormGroup>
							</Col>
							<Col md="12">
								<Button type="submit" className="mr-1" color="primary">
									{isSubmitting ? 'Creating new user ' : 'Submit'}
								</Button>
							</Col>
						</Row>
					</AvForm>
				</CardBody>
			</Card>
		</Fragment>
	);
};
export default AddUser;
