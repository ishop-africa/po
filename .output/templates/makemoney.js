const makeMoneyithOracle = `
<img src="https://et.peteroracle.co.za/assets/images/p1-1419x1761.jpg" class="absolute inset-0 object-cover h-full"
      alt="" />
    <div class="relative bg-gray-900 bg-opacity-75 h-[100vh]">
      <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div class="flex flex-col items-center justify-between xl:flex-row">
          <div class="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
            <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold tracking-wide text-white sm:text-4xl sm:leading-none">
              Sign Up and Learn <br class="hidden md:block" />
              <span class="text-yellow-600">18 Modern Ways To Make Money </span> Online for only $45
            </h2>
            <p class="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
              Start now and here to make the best out of your life. You can subscribe as an afliate to earn from this
              program. once you sign up as an afliate we will send your personal link for you to use in inviting others.
            </p>
            <ul class="list-numered">
              <li></li>
            </ul>

          </div>
          <div class="w-full max-w-xl xl:px-8 xl:w-5/12">
            <div class="bg-white rounded shadow-2xl p-7 sm:p-10">
              <h3 id="po-title" class="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                Sign up Now
              </h3>

              <form id="po-signup-form">
                <div class="mb-1 sm:mb-2">
                  <label for="firstName" class="inline-block mb-1 font-medium">First name</label>
                  <input placeholder="First Name" required="" type="text"
                    class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="firstName" name="firstName" />
                </div>
                <div class="mb-1 sm:mb-2">
                  <label for="lastName" class="inline-block mb-1 font-medium">Last name</label>
                  <input placeholder="Surname" required="" type="text"
                    class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="lastName" name="lastName" />
                </div>
                <div class="mb-1 sm:mb-2">
                  <label for="email" class="inline-block mb-1 font-medium">E-mail</label>
                  <input placeholder="realname@example.org" required="" type="text"
                    class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="email" name="email" />
                </div>
                <div class="mb-1 sm:mb-2">
                  <label for="phone" class="inline-block mb-1 font-medium">Phone number</label>
                  <input placeholder="name@org.co" required="" type="text"
                    class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="phone" name="phone" />
                </div>
                <div class="mb-1 sm:mb-2">
                  <label for="email" class="inline-block mb-1 font-medium">Become an Aflicate? </label>
                  <select required="" type="text"
                    class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="option" name="affliate" />
                  <option value="no" selected>no</option>
                  <option value="yes">yes</option>
                  <input type="hidden" name="description"
                    value="Learn 18 Moden Ways To make money online - Peter Oracle ">
                  </select>

                </div>
                <div class="mt-4 mb-2 sm:mb-4">
                  <button type="submit"
                    class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-yellow-600 hover:bg-yellow-700 focus:shadow-outline focus:outline-none">
                    Subscribe
                  </button>
                </div>
                <p class="text-xs text-gray-600 sm:text-sm">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>

              <form id="payment-form" method="POST">
                <div class="one-liner">
                  <div id="card-frame">
                    <!-- Yoco Inline form will be added here -->
                  </div>
                  <button id="pay-button">
                    Pay $45 <span id="pay-amount"></span>
                  </button>
                </div>
                <p class="success-payment-message" />
              </form>
              <div class="congrats" id="congratulations">
                <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                  <div class="max-w-xl sm:mx-auto lg:max-w-2xl">
                    <div class="flex flex-col mb-16 sm:text-center sm:mb-0">

                      <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                        <h2
                          class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                          Congratulations <span class="text-yellow-600" id="userName"></span> You have enrolled.
                        </h2>
                        <p class="text-base text-gray-700 md:text-lg">
                          We Have sent you an email with your details to access your lessons <span
                            id="isAfflite"></span>.
                        </p>

                      </div>
                      <div>
                        <a href="/"
                          class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-yellow-600 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">
                          Go Back to Home page
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

`;
export { makeMoneyithOracle };
